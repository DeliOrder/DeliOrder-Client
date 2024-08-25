import { useState } from "react";
import axios from "axios";

import Modal from "../Modal";
import NumberInput from "./NumberInput";
import PreNotification from "./PreNotification";

<<<<<<< HEAD
function ReceivingPackage() {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [infoModalMessage, setInfoModalMessage] = useState("");
  const [processResults, setProcessResults] = useState([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
<<<<<<< HEAD
  const [modalMessage, setModalMessage] = useState("");
  const [orders, setOrders] = useState([]);

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

=======
=======
import useModalConfig from "../../utils/useModalConfig";
>>>>>>> a64b85c (Feat: 패키지 실행 결과를 보여줍니다.)

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

  const { modalConfig: resultModalConfig, openModal: openResultModal } =
    useModalConfig();

  const { modalConfig: infoModalConfig, openModal: openInfoModal } =
    useModalConfig();

  const {
    modalConfig: confirmModalConfig,
    openModal: openConfirmModal,
    closeModal: closeConfirmModal,
  } = useModalConfig();

  const navigate = useNavigate();
>>>>>>> 42310f0 (Feat: 각 오더의 결과값을 받아올 수 있도록 로직 구현)
  const navigateToMainPage = () => {
    navigate("/");
  };

  const handleGetOrder = async (event) => {
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
      console.log("조회완료");
      const currentPackage = response.data.existPackage.orders;

<<<<<<< HEAD
<<<<<<< HEAD
      if (orderList) {
        setOrders(orderList);
        setIsNotificationOpen(true);
      }

      if (!handleConfirmReply) {
        setModalMessage("취소합니다.");
        setIsAlertModalOpen(true);
      }

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
      setModalMessage(response.data.message);
      setIsAlertModalOpen(true);
=======
      const orderList = response.data.existPackage.orders;
      setCurrentOrders(orderList);

      setIsNotificationOpen(true);
>>>>>>> 42310f0 (Feat: 각 오더의 결과값을 받아올 수 있도록 로직 구현)
=======
      openConfirmModal(
        <>
          <PreNotification orders={currentPackage} />
          <p className="my-2 flex justify-around">
            <button
              type="button"
              onClick={() => handleProcessPackage(currentPackage)}
              className="button-yellow-square w-24"
            >
              확인
            </button>
          </p>
        </>,
        "패키지 내용 확인",
        navigateToMainPage,
      );
>>>>>>> a64b85c (Feat: 패키지 실행 결과를 보여줍니다.)

      setCurrentPackage(response.data.existPackage.orders);
      openConfirmModal();
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
<<<<<<< HEAD
                onKeyDownFunc={(event) => {
                  validateNumber(event);
                  updateInputNumbers(event);
                }}
                onChangeFunc={handleFocusShift}
=======
                setInputNumbers={setInputNumbers}
                inputNumbers={inputNumbers}
                index={index}
>>>>>>> 42310f0 (Feat: 각 오더의 결과값을 받아올 수 있도록 로직 구현)
              />
            ))}
        </div>
        <button
          type="submit"
          onClick={handleGetPackage}
          className="button-slate-round"
        >
          받기
        </button>
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
      </form>
    </div>
  );
}

export default ReceivingPackage;
