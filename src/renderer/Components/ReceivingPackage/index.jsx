import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Modal from "../Modal";
import NumberInput from "./NumberInput";
import { SERIAL_NUMBER_LENGTH } from "../../constants/config";

function ReceivingPackage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const validateNumber = (event) => {
    const VALID_KEY = [
      "Tab",
      "Backspace",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
    ];

    if (!VALID_KEY.includes(event.key) || event.key === " ") {
      event.preventDefault();
    }
  };
  const updateInputNumbers = (event) => {
    if (event.target.value && event.code !== "Backspace") {
      return event.target.nextSibling?.focus();
    }

    if (!event.target.value && event.code === "Backspace") {
      return event.target.previousSibling?.focus();
    }
  };

  const handleFocusShift = (event) => {
    if (event.nativeEvent.data === null) {
      event.target.previousSibling?.focus();
      return;
    }

    if (event) {
      event.target.nextSibling?.focus();
    }
  };

  const navigateToMainPage = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  const handleReceivePackage = async (event) => {
    event.preventDefault();
    try {
      const inputNumbers = Array.from(
        event.target.elements,
        (element) => element.value,
      );
      const serialNumber = inputNumbers.join("");
      const {
        data: {
          existPackage: { orders: orderList },
          message,
        },
      } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/packages/${serialNumber}`,
      );

      const processActions = async () => {
        for (const order of orderList) {
          switch (order.action) {
            case "생성하기":
              await window.electronAPI.downloadFile(order);
              break;
            case "이동하기":
              await window.electronAPI.moveFile(order);
              break;
            case "복제하기":
              await window.electronAPI.replicateFile(order);
              break;
            case "수정하기":
              await window.electronAPI.editFileName(order);
              break;
            case "실행하기":
              await window.electronAPI.executeFile(order);
              break;
            case "삭제하기":
              await window.electronAPI.deleteFile(order);
              break;
            default:
              console.error("입력 되지 않은 행동입니다.");
          }
        }
      };

      processActions();
      setModalMessage(message);
      setIsModalOpen(true);
    } catch (error) {
      if (error.response) {
        setModalMessage(error.response.data.message);
      } else {
        setModalMessage("응답을 받지 못했습니다.");
      }
      setIsModalOpen(true);
    }
  };

  return (
    <div className="flex h-[90.5vh] items-center justify-center bg-blue-100">
      <form
        onSubmit={handleReceivePackage}
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
                onKeyDownFunc={(event) => {
                  validateNumber(event);
                  updateInputNumbers(event);
                }}
                onChangeFunc={handleFocusShift}
              />
            ))}
        </div>
        <button
          type="submit"
          className="m-5 w-1/3 transform rounded-full bg-slate-200 p-5 text-3xl shadow-lg transition duration-300 hover:scale-105"
        >
          받기
        </button>
        <Modal isOpen={isModalOpen} onClose={navigateToMainPage}>
          <h2 className="mb-4 text-xl font-semibold">DELIORDER</h2>
          <p>{modalMessage}</p>
          <button
            className="focus:shadow-outline mt-4 rounded-md bg-blue-400 px-4 py-2 text-center font-bold text-white hover:bg-blue-500"
            onClick={navigateToMainPage}
          >
            메인페이지로 이동하기
          </button>
        </Modal>
      </form>
    </div>
  );
}

export default ReceivingPackage;
