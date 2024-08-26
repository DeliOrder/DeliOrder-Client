import axios from "axios";
import { useState } from "react";

import Modal from "../Modal";
import NumberInput from "./NumberInput";
import ProcessConfirm from "./ProcessConfirm";

import usePackageStore from "@renderer/store";
import useModal from "@renderer/utils/useModal";
import { SERIAL_NUMBER_LENGTH } from "@renderer/constants/config";

function ReceivingPackage() {
  const [currentPackage, setCurrentPackage] = useState([]);
  const { setInfoMessage, openInfoModal } = usePackageStore();
  const [isConfirmModalOpen, openConfirmModal, closeConfirmModal] = useModal();

  const handleGetPackage = async (event) => {
    event.preventDefault();

    try {
      const inputNumbers = Array.from(
        event.target.elements,
        (element) => element.value,
      );

      const serialNumber = inputNumbers.join("");
      if (serialNumber === "") {
        setInfoMessage("일련 번호를 입력해 주세요.");
        openInfoModal();

        return;
      }

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
            .fill("")
            .map((_, index) => (
              <NumberInput key={index} />
            ))}
        </div>
        <button type="submit" className="button-slate-round">
          받기
        </button>
      </form>
      <Modal
        title="패키지 내용 확인"
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
      >
        <ProcessConfirm
          orders={currentPackage}
          closeModal={closeConfirmModal}
        />
      </Modal>
    </div>
  );
}

export default ReceivingPackage;
