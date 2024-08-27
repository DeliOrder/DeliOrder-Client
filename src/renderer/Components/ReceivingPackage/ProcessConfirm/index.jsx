import PropTypes from "prop-types";
import { useState } from "react";

import Modal from "../../Modal";

import usePackageStore from "@renderer/store";
import useModal from "@renderer/utils/useModal";
import { GUIDE_MESSAGES } from "@renderer/constants/messages";

function ProcessConfirm({ orders, closeModal }) {
  const [processResults, setProcessResults] = useState([]);
  const [isResultModalOpen, openResultModal, closeResultModal] = useModal();
  const { setInfoMessage, openInfoModal } = usePackageStore();

  const startIndex = 0;
  const endIndex = orders.length - 1;

  const startPath = orders[startIndex].executionPath;
  const endPath = orders[endIndex].executionPath;

  const overview = orders.map((order, index) => {
    const indexNumber = index + 1;

    if (order.action === "수정하기") {
      return `${indexNumber}. ${order.attachmentName} 을(를) ${order.editingName}로 ${order.action}`;
    } else {
      return `${indexNumber}. ${order.attachmentName} 을(를) ${order.action}`;
    }
  });

  const handleProcessPackage = async (receivedPackage) => {
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
            case "압축해제하기":
              return await window.electronAPI.unzipFile(order);
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
    <>
      <div className="grid justify-items-start">
        <p className="mt-1 text-xs">시작경로 : {startPath}</p>
        <p className="mt-1 text-xs">종료경로 : {endPath}</p>
        <p className="mt-3 text-xs">진행내용 : </p>
        {overview.map((order) => (
          <p key={order} className="mt-2 text-xs">
            {order}
          </p>
        ))}
        <p className="mt-5 justify-self-center text-sm font-bold text-red-400">
          {GUIDE_MESSAGES.CONFIRMATION}
        </p>
      </div>
      <div className="mt-1 flex justify-center">
        <button
          type="button"
          onClick={() => handleProcessPackage(orders)}
          className="button-yellow-square w-24"
        >
          확인
        </button>
      </div>
      <Modal
        title="실행결과"
        isOpen={isResultModalOpen}
        onClose={() => {
          closeResultModal();
          closeModal();
        }}
      >
        {processResults.map((result, index) => (
          <p key={index} className="mt-2 text-xs">
            {result}
          </p>
        ))}
      </Modal>
    </>
  );
}

ProcessConfirm.propTypes = {
  orders: PropTypes.array.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default ProcessConfirm;