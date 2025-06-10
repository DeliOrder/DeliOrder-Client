import axios, { AxiosError } from "axios";
import { useState, useEffect, useRef, ReactNode } from "react";
import { useSearchParams } from "react-router-dom";

import Modal from "../Modal";
import NumberInput from "./NumberInput";
import ProcessConfirm from "./ProcessConfirm";

import usePackageStore from "@renderer/store";
import useModal from "@renderer/hooks/useModal";
import { SERIAL_NUMBER_LENGTH } from "@renderer/constants/config";
import { RECEIVING_ALERT, COMMON_ALERT } from "@renderer/constants/messages";

function ReceivingPackage(): ReactNode {
  const [currentPackage, setCurrentPackage] = useState([]);
  const { setInfoMessage, openInfoModal } = usePackageStore();
  const [searchParams] = useSearchParams();
  const targetButton = useRef(null);
  const [isConfirmModalOpen, openConfirmModal, closeConfirmModal] = useModal();

  const packageId = searchParams.get("packageId");

  const handleGetPackage = async (
    event: React.FocusEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    try {
      const form = event.target as HTMLFormElement;

      const inputNumbers = Array.from(
        form.elements,
        (element) => (element as HTMLInputElement).value,
      );

      const serialNumber = inputNumbers.join("");
      if (serialNumber === "") {
        setInfoMessage(RECEIVING_ALERT.REQUIRE_SERIAL_NUMBER);
        openInfoModal();

        return;
      }

      const {
        data: {
          existPackage: { orders, validUntil },
        },
      } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/packages/${serialNumber}`,
      );

      if (Date.parse(validUntil) <= Date.parse(String(new Date()))) {
        setInfoMessage(RECEIVING_ALERT.EXPIRED_SERIAL_NUMBER);
        openInfoModal();

        return;
      }

      if (orders) {
        setCurrentPackage(orders);
        openConfirmModal();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setInfoMessage(
          error.response ? error.response.data.error : COMMON_ALERT.ERROR_OCCUR,
        );
      }
      openInfoModal();
    }
  };

  useEffect(() => {
    if (packageId && targetButton.current) {
      (targetButton.current as HTMLInputElement).click();
    }
  }, [packageId]);

  return (
    <div className="flex flex-1 flex-col overflow-y-auto bg-gray-light">
      <div className="flex h-full flex-col items-center justify-center">
        <form
          onSubmit={handleGetPackage}
          className="flex h-[400px] w-fit flex-col items-center justify-center gap-10 rounded-xl bg-white p-10 shadow-2xl"
        >
          <label className="mb-2 mt-6 py-2 text-5xl font-bold tracking-wide text-gray-800">
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
            className="button-slate-round bg-blue-light text-white hover:bg-green-bright hover:text-black"
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
    </div>
  );
}

export default ReceivingPackage;
