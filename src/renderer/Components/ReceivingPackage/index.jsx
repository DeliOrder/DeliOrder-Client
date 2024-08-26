import axios from "axios";
import { useState } from "react";

import Modal from "../Modal";
import NumberInput from "./NumberInput";
import PreNotification from "./PreNotification";

import useModal from "@renderer/utils/useModal";
import { SERIAL_NUMBER_LENGTH } from "@renderer/constants/config";

function ReceivingPackage() {
  const [infoMessage, setInfoMessage] = useState("");
  const [currentPackage, setCurrentPackage] = useState([]);
  const [processResults, setProcessResults] = useState([]);

  const [isInfoModalOpen, openInfoModal, closeInfoModal] = useModal();
  const [isConfirmModalOpen, openConfirmModal, closeConfirmModal] = useModal();
  const [isResultModalOpen, openResultModal, closeResultModal] = useModal();

  const [inputNumbers, setInputNumbers] = useState(
    Array(SERIAL_NUMBER_LENGTH).fill(""),
  );
  const handleGetPackage = async (event) => {
    event.preventDefault();

    try {
      const serialNumber = inputNumbers.join("");
      const {
        data: {
          existPackage: { orders },
        },
      } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/packages/${serialNumber}`,
      );

      if (orders) {
        setCurrentPackage(orders);
        openConfirmModal();
      }
    } catch (error) {
      setInfoMessage(
        error.response
          ? error.response.data.message
          : "실행중 오류가 발생하였습니다",
      );
      openInfoModal();
    }
  };

  const handleProcessPackage = async (receivedPackage) => {
    closeConfirmModal();

    try {
      const results = await Promise.all(
        receivedPackage.map(async (order) => {
          switch (order.action) {
            case "생성하기":
              return await window.electronAPI.downloadFile(order);
            case "이동하기":
              return await window.electronAPI.moveFile(order);
            case "복제하기":
              return await window.electronAPI.replicateFile(order);
            case "수정하기":
              return await window.electronAPI.editFileName(order);
            case "실행하기":
              return await window.electronAPI.executeFile(order);
            case "삭제하기":
              return await window.electronAPI.deleteFile(order);
            default:
              return "알 수 없는 작업입니다";
          }
        }),
      );

      setProcessResults(results);
      openResultModal();
    } catch (error) {
      setInfoMessage(
        error.response
          ? error.response.data.message
          : "실행중 오류가 발생하였습니다",
      );
      openInfoModal();
    }
  };

  return (
    <div className="flex h-[90.5vh] items-center justify-center bg-blue-100">
      <form
        onSubmit={handleGetPackage}
        className="flex h-3/5 w-3/5 flex-col items-center gap-20 rounded-xl bg-white p-10 shadow-2xl"
      >
        <label className="text-6xl font-semibold tracking-wide text-gray-800">
          일련번호
        </label>
        <div className="flex justify-center">
          {Array(SERIAL_NUMBER_LENGTH)
            .fill()
            .map((_, index) => (
              <NumberInput
                key={index}
                setInputNumbers={setInputNumbers}
                inputNumbers={inputNumbers}
                index={index}
              />
            ))}
        </div>
        <button type="submit" className="button-slate-round">
          받기
        </button>
      </form>
      <Modal title={"오류"} isOpen={isInfoModalOpen} onClose={closeInfoModal}>
        <p>{infoMessage}</p>
      </Modal>
      <Modal
        title={"패키지 내용 확인"}
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
      >
        <PreNotification orders={currentPackage} />
        <button
          type="button"
          onClick={() => handleProcessPackage(currentPackage)}
          className="button-yellow-square w-24"
        >
          확인
        </button>
      </Modal>
      <Modal
        title="실행결과"
        isOpen={isResultModalOpen}
        onClose={closeResultModal}
      >
        {processResults.map((result, index) => (
          <p key={index} className="mt-2 text-xs">
            {result}
          </p>
        ))}
      </Modal>
    </div>
  );
}

export default ReceivingPackage;
