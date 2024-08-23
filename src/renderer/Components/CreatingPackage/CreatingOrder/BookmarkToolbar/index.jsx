import axios from "axios";
import { useState } from "react";

import usePackageStore from "@renderer/store";
import Modal from "../../../Modal";
import InfoModal from "../../../InfoModal";
import { GUIDE_MESSAGES } from "@renderer/constants/messages.js";

import addingIcon from "@images/addingIcon.svg";
import downloadIcon from "@images/downloadIcon.svg";
import refreshToken from "../../../../utils/refreshToken";

function BookmarkToolbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookmarks, setBookMarks] = useState([]);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const {
    clientStatus: { isLogin },
    getOrder,
    updateOrder,
  } = usePackageStore();

  const userId = window.localStorage.getItem("userId");
  const jwtToken = window.localStorage.getItem("jwtToken");
  const authorization = "Bearer " + jwtToken;

  const notifyLoginRequired = () => {
    setIsError(true);
    setInfoMessage(GUIDE_MESSAGES.REQUIRE_LOGIN);
  };

  const handleAddBookmark = async () => {
    if (!isLogin) {
      notifyLoginRequired();
      setIsInfoModalOpen(true);
      return;
    }

    const BookmarkTarget = getOrder();

    if (!validateRequiredInputs(BookmarkTarget)) {
      setIsError(true);
      setInfoMessage(GUIDE_MESSAGES.BOOKMARK_REQUIREMENT);
      setIsInfoModalOpen(true);
      return;
    }

    const formattedBookmarkData = {
      ...BookmarkTarget,
      attachmentType: "",
      attachmentFile: "",
      attachmentUrl: "",
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/users/${userId}/bookmark`,
        { action: formattedBookmarkData },
        {
          headers: {
            "Content-Type": "application/json",
            ...(jwtToken && { authorization }),
          },
        },
      );

      setInfoMessage(response.data.message);
      setIsInfoModalOpen(true);
    } catch (error) {
      const { response } = error;

      if (response) {
        const { error: errorMessage, message } = response.data;

        switch (errorMessage) {
          case "Token expired":
            refreshToken();
            handleAddBookmark();
            break;

          case "Unauthorized":
            notifyLoginRequired();
            break;

          default:
            console.error("즐겨찾기 등록하는 중 에러발생 :", message);
            setInfoMessage(`에러발생: ${message}`);
            break;
        }
      } else {
        console.error("응답을 받지 못하였습니다");
        setInfoMessage("일시적 서버 에러입니다. 잠시 후 다시 시도해주세요");
      }

      setIsError(true);
      setIsInfoModalOpen(true);
    }
  };

  const handleGetBookmark = async () => {
    if (!isLogin) {
      notifyLoginRequired();
      setIsInfoModalOpen(true);
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/users/${userId}/bookmark`,
        {
          headers: {
            "Content-Type": "application/json",
            ...(jwtToken && { authorization }),
          },
        },
      );

      setBookMarks(response.data.bookmarkList);
      setIsModalOpen(true);
    } catch (error) {
      const { response } = error;

      if (response) {
        const { error: errorMessage, message } = response.data;

        switch (errorMessage) {
          case "Token expired":
            refreshToken();
            handleAddBookmark();
            break;

          case "Unauthorized":
            notifyLoginRequired();
            break;

          default:
            console.error("즐겨찾기 등록하는 중 에러발생 :", message);
            setInfoMessage(`에러발생: ${message}`);
            break;
        }
      } else {
        console.error("응답을 받지 못하였습니다");
        setInfoMessage("일시적 서버 에러입니다. 잠시 후 다시 시도해주세요");
      }

      setIsError(true);
      setIsInfoModalOpen(true);
    }
  };

  const applyBookmark = (index) => {
    delete bookmarks[index]._id;
    delete bookmarks[index].updatedAt;
    delete bookmarks[index].createdAt;

    updateOrder(bookmarks[index]);
    setIsModalOpen(false);
  };

  const validateRequiredInputs = (inputs) => {
    const requiredField = ["action", "attachmentName", "executionPath"];
    return requiredField.every((field) => inputs[field].length > 0);
  };

  const closeModal = () => {
    setIsError(false);
    setIsInfoModalOpen(false);
  };

  return (
    <>
      {bookmarks.length > 0 && (
        <Modal isOpen={isModalOpen}>
          {bookmarks.map((bookmark, index) => (
            <button
              key={bookmark.createdAt}
              className="button-base-blue"
              onClick={() => {
                applyBookmark(index);
              }}
            >
              {bookmark.action}
            </button>
          ))}
          <button
            className="button-yellow-square"
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            닫기
          </button>
        </Modal>
      )}
      {
        <InfoModal isOpen={isInfoModalOpen} onClose={closeModal}>
          <p className={`font-bold ${isError ? "text-red-600" : ""}`}>
            {infoMessage}
          </p>
        </InfoModal>
      }
      <span className="label-large">즐겨찾기</span>
      <div className="flex flex-row justify-around py-1">
        <div className="flex flex-row">
          <span className="text-sm-gray-centered">추가하기</span>
          <button
            type="button"
            className="button-blue-round"
            onClick={handleAddBookmark}
          >
            <img src={addingIcon} alt="adding Icon" />
          </button>
        </div>
        <div className="flex flex-row">
          <span className="text-sm-gray-centered">가져오기</span>
          <button
            type="button"
            className="button-yellow-square"
            onClick={handleGetBookmark}
          >
            <img src={downloadIcon} alt="download Icon" />
          </button>
        </div>
      </div>
    </>
  );
}

export default BookmarkToolbar;
