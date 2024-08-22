import axios from "axios";
import { useState } from "react";

import usePackageStore from "@renderer/store";
import Modal from "../../../Modal";
import InfoModal from "../../../InfoModal";
import { GUIDE_MESSAGES } from "@renderer/constants/messages.js";

import addingIcon from "@images/addingIcon.svg";
import downloadIcon from "@images/downloadIcon.svg";

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

  const userId = localStorage.getItem("userId");
  const notifyLoginRequired = () => {
    setIsError(true);
    setInfoMessage(GUIDE_MESSAGES.REQUIRE_LOGIN);
  };

  const handleAddBookmark = async () => {
    if (!isLogin) {
      notifyLoginRequired();
      return;
    }
    const BookmarkTarget = getOrder();

    if (!validateRequiredInputs(BookmarkTarget)) {
      setIsError(true);

      setInfoMessage(GUIDE_MESSAGES.BOOKMARK_REQUIREMENT);
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
          },
        },
      );

      setInfoMessage(response.data.message);
      setIsInfoModalOpen(true);
    } catch (error) {
      console.error(
        "즐겨찾기 등록하는 중 에러발생 :",
        error.response.data.message,
      );
      setInfoMessage(
        "즐겨찾기 등록하는 중 에러발생",
        error.response.data.message,
      );

      setIsError(true);
      setIsInfoModalOpen(true);
    }
  };

  const handleGetBookmark = async () => {
    if (!isLogin) {
      notifyLoginRequired();
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/users/${userId}/bookmark`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      setBookMarks(response.data.bookmarkList);
      setIsModalOpen(true);
    } catch (error) {
      console.error(
        "즐겨찾기 가져오는 중 에러발생 :",
        error.response.data.message,
      );
      setInfoMessage(
        "즐겨찾기 가져오는 중 에러발생 :",
        error.response.data.message,
      );
    }
  };

  const applyBookmark = (index) => {
    updateOrder(bookmarks[index]);
    setIsModalOpen(false);
  };

  const validateRequiredInputs = (inputs) => {
    const requiredField = ["action", "attachmentName", "executionPath"];
    return requiredField.every((field) => inputs[field].length > 0);
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
        <InfoModal isOpen={isInfoModalOpen}>
          <h2 className="mb-4 text-xl font-semibold">DELIORDER</h2>
          <p className={`font-bold ${isError ? "text-red-600" : ""}`}>
            {infoMessage}
          </p>
          <button
            className="focus:shadow-outline mt-4 rounded-md bg-blue-400 px-4 py-2 text-center font-bold text-white hover:bg-blue-500"
            onClick={() => {
              setIsError(false);
              setIsInfoModalOpen(false);
            }}
          >
            닫기
          </button>
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
