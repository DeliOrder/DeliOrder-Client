import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import Modal from "../Modal";
import NumberInput from "./NumberInput";
import ProcessConfirm from "./ProcessConfirm";

import usePackageStore from "@renderer/store";
import useModal from "@renderer/hooks/useModal";
import { SERIAL_NUMBER_LENGTH } from "@renderer/constants/config";
import { RECEIVING_ALERT, COMMON_ALERT } from "@renderer/constants/messages";

function ReceivingPackage() {
  const [currentPackage, setCurrentPackage] = useState([]);
  const { setInfoMessage, openInfoModal } = usePackageStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const targetButton = useRef();
  const [isConfirmModalOpen, openConfirmModal, closeConfirmModal] = useModal();

  const packageId = searchParams.get("packageId");

  const handleGetPackage = async (event) => {
    event.preventDefault();

    try {
      const inputNumbers = Array.from(
        event.target.elements,
        (element) => element.value,
      );

      const serialNumber = inputNumbers.join("");
      if (serialNumber === "") {
        setInfoMessage(RECEIVING_ALERT.REQUIRE_SERIAL_NUMBER);
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
        error.response ? error.response.data.error : COMMON_ALERT.ERROR_OCCUR,
      );
      openInfoModal();
    }
  };

  useEffect(() => {
    if (packageId) {
      targetButton.current.click();
    }
  }, [targetButton]);

  return (
    <div className="flex flex-grow items-center justify-center bg-blue-100">
      <form
        onSubmit={handleGetPackage}
        className="flex h-3/5 w-3/5 flex-col items-center justify-center gap-20 rounded-xl bg-white p-10 shadow-2xl"
      >
        <label className="py-2 text-6xl font-semibold tracking-wide text-gray-800">
          일련번호
        </label>
        <div className="flex justify-center">
          {Array(SERIAL_NUMBER_LENGTH)
            .fill("")
            .map((_, index) => (
              <NumberInput
                key={index}
                inputValue={packageId ? packageId[index] : ""}
              />
            ))}
        </div>
        <button
          type="submit"
          className="button-slate-round hover:bg-blue-600 hover:text-white"
          ref={targetButton}
        >
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
