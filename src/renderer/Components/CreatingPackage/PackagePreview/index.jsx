import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import Modal from "../../Modal";

import usePackageStore from "@renderer/store";
import Order from "./Order";
import refreshToken from "../../../utils/refreshToken";

function PackagePreview() {
  const { orders, getOrders, clearOrders } = usePackageStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serialNumber, setSerialNumber] = useState("");
  const [expiredTime, setExpiredTime] = useState("");
  const navigate = useNavigate();

  const orderPackage = getOrders();
  const s3Client = new S3Client({
    region: import.meta.env.VITE_AWS_REGION,
    credentials: {
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY_ID,
    },
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(serialNumber);
  };

  const uploadFileToAWS = async () => {
    try {
      const fileList = orderPackage.filter(
        (action) => action.action === "생성하기",
      );

      // TODO:: console.error 관련 사용자에게 직접 표시되도록 개선 필요
      if (!fileList.every((action) => action.attachmentType === "file")) {
        setIsLoading(false);
        throw new Error("파일이 선택되지 않았습니다.");
      }

      // TODO: 대용량 파일 전송을 대비한 Promise.allSettled 사용 고려 및 트랜잭션을 고려한 로직 개선 필요
      await Promise.all(
        fileList.map(async (file) => {
          const uploadParams = {
            Bucket: import.meta.env.VITE_AWS_BUCKET,
            Key: file.attachmentName,
            Body: file.attachmentFile,
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
    } catch (error) {
      throw new Error("AWS에 업로드중 문제가 발생하였습니다.", error);
    }
  };

  const deleteFileToAWS = async () => {
    try {
      const fileList = orderPackage.filter(
        (action) => action.action === "생성하기",
      );

      if (!fileList.every((action) => action.attachmentType === "file")) {
        setIsLoading(false);
        throw new Error("파일이 선택되지 않았습니다.");
      }

      await Promise.all(
        fileList.map(async (file) => {
          const deleteParams = {
            Bucket: import.meta.env.VITE_AWS_BUCKET,
            Key: file.attachmentName,
          };

          const deleteCommand = new DeleteObjectCommand(deleteParams);
          await s3Client.send(deleteCommand);
        }),
      );
    } catch (error) {
      console.log(error);
      throw new Error("AWS 파일 삭제중 문제가 발생하였습니다.", error);
    }
  };

  const uploadPackageToServer = async () => {
    try {
      const deliOrderToken = window.localStorage.getItem("deliOrderToken");
      const authorization = "Bearer " + deliOrderToken;

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/packages/new`,
        { orders: orderPackage },
        {
          headers: {
            "Content-Type": "application/json",
            ...(deliOrderToken && { authorization }),
          },
        },
      );
      setSerialNumber(response.data.serialNumber);
    } catch (error) {
      if (error.response?.data.error === "Token expired") {
        refreshToken();
        uploadPackageToServer();
      }
      throw new Error("패키지 업로드중 오류가 발생했습니다.", error);
    }
  };

  const handleFilePackage = async () => {
    try {
      setIsLoading(true);
      await uploadFileToAWS();
      await uploadPackageToServer();

      const now = new Date();
      const tenMinutesLater = new Date(now.getTime() + 10 * 60000);

      setExpiredTime(tenMinutesLater);
      openModal();
    } catch (error) {
      deleteFileToAWS();
      console.error("파일을 업로드하던중 문제가 발생하였습니다.", error);
    } finally {
      clearOrders();
      setIsLoading(false);
    }
  };

  const navigateToMainPage = () => {
    closeModal();
    navigate("/");
  };

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
        disabled={isLoading}
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
                defaultValue={serialNumber}
                className="flex-grow rounded-l-md border px-2 py-1"
                readOnly
              />
              <button
                className="rounded-r-md bg-blue-400 px-4 py-1 text-white hover:bg-blue-500"
                onClick={copyToClipboard}
              >
                복사
              </button>
            </div>
          </div>
          <div className="mb-4">
            <p>링크주소</p>
            <div className="flex">
              <input
                type="text"
                defaultValue="링크기능은 현재 준비중입니다."
                className="flex-grow rounded-l-md border bg-gray-300 px-2 py-1"
                readOnly
              />
              <button className="disabled cursor-default rounded-r-md bg-gray-400 px-4 py-1 text-black">
                복사
              </button>
            </div>
          </div>
          <p className="mt-4">
            이 일련번호와 링크주소는 10분 뒤(
            {expiredTime ? expiredTime.toLocaleTimeString().slice(0, -3) : ""}
            )까지 유효합니다
          </p>
          <div className="flex justify-center">
            <button
              className="mt-4 rounded-md bg-blue-400 px-4 py-2 font-bold text-white hover:bg-blue-500 focus:outline-none"
              onClick={closeModal}
            >
              닫기
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default PackagePreview;
