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

import Order from "./Order";
import Modal from "../../Modal";

import usePackageStore from "@renderer/store";
import useModal from "@renderer/utils/useModal";
import refreshToken from "@renderer/utils/refreshToken";

function PackagePreview() {
  const [isLoading, setIsLoading] = useState(false);
  const [expiredTime, setExpiredTime] = useState("");
  const [serialNumber, setSerialNumber] = useState("");

  const [isOpen, openModal, closeModal] = useModal();
  const { orders, getOrders, clearOrders, setInfoMessage, openInfoModal } =
    usePackageStore();
  const orderPackage = getOrders();
  const navigate = useNavigate();

  const s3Client = new S3Client({
    region: import.meta.env.VITE_AWS_REGION,
    credentials: {
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY_ID,
    },
  });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(serialNumber);
  };

  const uploadFileToAWS = async () => {
    const ordersToCreate = orderPackage.filter(
      (order) => order.action === "생성하기",
    );

    if (!ordersToCreate.every((order) => order.attachmentType === "file")) {
      setIsLoading(false);
      setInfoMessage("생성할 파일이 선택되지 않았습니다.");
      openInfoModal();
    }

    try {
      await Promise.all(
        ordersToCreate.forEach(async (order) => {
          const uploadParams = {
            Bucket: import.meta.env.VITE_AWS_BUCKET,
            Key: order.attachmentName,
            Body: order.attachmentFile,
            ACL: "public-read",
          };

          const uploadCommand = new PutObjectCommand(uploadParams);
          await s3Client.send(uploadCommand);

          const getCommand = new GetObjectCommand({
            Bucket: import.meta.env.VITE_AWS_BUCKET,
            Key: order.attachmentName,
          });

          const signedUrl = await getSignedUrl(s3Client, getCommand, {
            expiresIn: 600,
          });

          order.attachmentUrl = signedUrl;
        }),
      );
    } catch (error) {
      throw new Error("AWS에 업로드중 문제가 발생하였습니다.", error);
    }
  };

  const deleteFileToAWS = async () => {
    try {
      const ordersToCreate = orderPackage.filter(
        (order) => order.action === "생성하기",
      );

      if (!ordersToCreate.every((action) => action.attachmentType === "file")) {
        setIsLoading(false);
        throw new Error("파일이 선택되지 않았습니다.");
      }

      await Promise.all(
        ordersToCreate.map(async (file) => {
          const deleteParams = {
            Bucket: import.meta.env.VITE_AWS_BUCKET,
            Key: file.attachmentName,
          };

          const deleteCommand = new DeleteObjectCommand(deleteParams);
          await s3Client.send(deleteCommand);
        }),
      );
    } catch (error) {
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
    if (!orderPackage.length) {
      setInfoMessage("패키지가 비어 있습니다.");
      openInfoModal();
      return;
    }

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
      console.error(
        "파일을 업로드하던중 문제가 발생하였습니다.",
        error.message,
      );

      setInfoMessage("첨부파일 업로드에 실패하였습니다. 다시 시도해 주세요.");
      openInfoModal();
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
    <div className="container-large">
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
      <Modal title="DELIORDER" isOpen={isOpen} onClose={navigateToMainPage}>
        <div>
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
        </div>
      </Modal>
    </div>
  );
}

export default PackagePreview;
