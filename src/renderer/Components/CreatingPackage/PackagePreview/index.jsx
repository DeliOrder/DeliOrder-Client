import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import Modal from "../../Modal";

import usePackageStore from "@renderer/store";
import Order from "./Order";

function PackagePreview() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { orders } = usePackageStore();
  const { getOrders } = usePackageStore();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const s3Client = new S3Client({
    region: import.meta.env.VITE_AWS_REGION,
    credentials: {
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY_ID,
    },
  });

  const handleFilePackage = async () => {
    const orderPackage = getOrders();

    const fileList = orderPackage.filter(
      (action) =>
        action.attachmentType === "file" && action.action === "생성하기",
    );

    if (!fileList || fileList.length === 0) {
      console.error("파일이 선택되지 않았습니다.");
      return;
    }

    try {
      await Promise.all(
        fileList.map(async (file) => {
          const uploadParams = {
            Bucket: import.meta.env.VITE_AWS_BUCKET,
            Key: file.attachmentName,
            Body: file.attachmentName,
            ACL: "public-read",
          };

          const uploadCommand = new PutObjectCommand(uploadParams);
          await s3Client.send(uploadCommand);

          const getCommand = new GetObjectCommand({
            Bucket: import.meta.env.VITE_AWS_BUCKET,
            Key: file.attachmentName,
          });

          const signedUrl = await getSignedUrl(s3Client, getCommand, {
            expiresIn: 600,
          });

          file.attachmentUrl = signedUrl;

          return signedUrl;
        }),
      );

      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/packages/new`,
        orderPackage,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      openModal();
    } catch (err) {
      console.error("파일 업로드 중 오류 발생:", err);
    }
  };
  const navigateToMainPage = () => {
    closeModal();
    navigate("/");
  };
  // TODO: 링크 및 일련번호 생성 후 모달창에 동적으로 값부여 및 복사버튼에 기능부여 필요
  return (
    <div className="relative w-3/5 bg-white px-6 pb-8 pt-10 shadow-sm ring-1 ring-gray-900/5 sm:mr-3 sm:max-w-full sm:rounded-lg sm:px-10">
      <label className="mb-2 block text-xl font-bold text-gray-700">
        패키지 미리보기
      </label>
      <div className="overflow-y-scroll">
        {orders.map((order, index) => (
          <Order key={index} order={order} index={index} />
        ))}
      </div>
      <button
        className="absolute bottom-3 right-5 my-3 rounded bg-blue-500 px-6 py-3 text-xl font-bold text-white hover:bg-blue-700"
        onClick={handleFilePackage}
      >
        패키징하기
      </button>
      <Modal isOpen={isModalOpen} onClose={navigateToMainPage}>
        <div>
          <h2 className="mb-4 text-center text-xl font-semibold">DELIORDER</h2>
          <div className="mb-4">
            <p>일련번호</p>
            <div className="flex">
              <input
                type="text"
                defaultValue="777777"
                className="flex-grow rounded-l-md border px-2 py-1"
                readOnly
              />
              <button className="rounded-r-md bg-blue-400 px-4 py-1 text-white hover:bg-blue-500">
                복사
              </button>
            </div>
          </div>
          <div className="mb-4">
            <p>링크주소</p>
            <div className="flex">
              <input
                type="text"
                defaultValue="https://www.naver.com"
                className="flex-grow rounded-l-md border px-2 py-1"
                readOnly
              />
              <button className="rounded-r-md bg-blue-400 px-4 py-1 text-white hover:bg-blue-500">
                복사
              </button>
            </div>
          </div>
          <p className="mt-4">
            이 일련번호와 링크주소는 10분 뒤(
            {new Date().toLocaleTimeString().slice(0, -3)})까지 유효합니다
          </p>
          <div className="flex justify-center">
            <button
              className="mt-4 rounded-md bg-blue-400 px-4 py-2 font-bold text-white hover:bg-blue-500 focus:outline-none"
              onClick={navigateToMainPage}
            >
              메인화면으로
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default PackagePreview;
