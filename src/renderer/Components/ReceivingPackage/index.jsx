import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Modal from "../Modal";
import NumberInput from "./NumberInput";
import { SERIAL_NUMBER_LENGTH } from "../../constants/config";

function ReceivingPackage() {
  const [isModalOpen, setIsModalOpen] = useState();
  const [inputNumbers, setInputNumbers] = useState(
    Array(SERIAL_NUMBER_LENGTH).fill(""),
  );
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
  const updateInputNumbers = (event, index) => {
    if (!isNaN(event.key) && event.key.trim() !== "") {
      const tempNumbers = [...inputNumbers];
      tempNumbers[index] = event.key;
      setInputNumbers(tempNumbers);
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
      const serialNumber = inputNumbers.join("");
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/packages/${serialNumber}`,
      );
      const orderList = response.data.existPackage.orders;
      // TODO: 콘솔로그를 일렉트론의 유틸함수와 연결해주기
      const processActions = async () => {
        for (const order of orderList) {
          switch (order.action) {
            case "생성하기":
              console.log("파일을 생성합니다");
              break;
            case "이동하기":
              console.log("파일을 이동합니다");
              break;
            case "복제하기":
              console.log("파일을 복제합니다");
              break;
            case "수정하기":
              await window.electronAPI.editFileName(order);
              console.log("파일명을 수정합니다");
              break;
            case "실행하기":
              console.log("파일을 실행합니다");
              break;
            case "삭제하기":
              await window.electronAPI.deleteFile(order);
              console.log("파일을 삭제합니다");
              break;
            default:
              console.log("알 수 없는 작업입니다");
          }
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      };

      processActions();
      setModalMessage(response.data.message);
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
      <form className="flex h-3/5 w-3/5 flex-col items-center gap-20 rounded-xl bg-white p-10 shadow-2xl">
        <label className="text-6xl font-semibold tracking-wide text-gray-800">
          일련번호
        </label>
        <div className="flex justify-center">
          {Array(SERIAL_NUMBER_LENGTH)
            .fill()
            .map((_, index) => (
              <NumberInput
                key={index}
                onKeyDownFunc={() => {
                  validateNumber(event);
                  updateInputNumbers(event, index);
                }}
                onChangeFunc={handleFocusShift}
              />
            ))}
        </div>
        <button
          type="submit"
          onClick={handleReceivePackage}
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
