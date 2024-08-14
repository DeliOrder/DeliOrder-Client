import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Modal from "../Modal";
import NumberInput from "./NumberInput";

function ReceivingPackage() {
  const [isModalOpen, setIsModalOpen] = useState();
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

  const handleMoveNextInput = (event) => {
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

  const handleReceiveResult = (event) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <div className="flex h-[90.5vh] items-center justify-center bg-blue-100">
      <form className="flex h-3/5 w-3/5 flex-col items-center gap-20 rounded-xl bg-white p-10 shadow-2xl">
        <label className="text-6xl font-semibold tracking-wide text-gray-800">
          일련번호
        </label>
        <div className="flex justify-center">
          {Array(6).fill(
            <NumberInput
              validateNumber={validateNumber}
              handleMoveNextInput={handleMoveNextInput}
            />,
          )}
        </div>
        <button
          onClick={handleReceiveResult}
          className="m-5 w-1/3 transform rounded-full bg-slate-200 p-5 text-3xl shadow-lg transition duration-300 hover:scale-105"
        >
          받기
        </button>
        <Modal isOpen={isModalOpen} onClose={navigateToMainPage}>
          <h2 className="mb-4 text-xl font-semibold">DELIORDER</h2>
          <p>행동 수행중</p>
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
