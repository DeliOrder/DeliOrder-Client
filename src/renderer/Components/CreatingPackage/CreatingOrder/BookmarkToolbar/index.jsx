import axios from "axios";
import { useState } from "react";

import Modal from "../../../Modal";
import usePackageStore from "@renderer/store";
import useModal from "@renderer/utils/useModal";
import refreshToken from "@renderer/utils/refreshToken";
import { GUIDE_MESSAGES } from "@renderer/constants/messages.js";

import addingIcon from "@images/addingIcon.svg";
import downloadIcon from "@images/downloadIcon.svg";

function BookmarkToolbar() {
  const [bookmarks, setBookMarks] = useState([]);
  const [isBookmarkListOpen, openBookmarkList, closeBookmarkList] = useModal();

  const { openInfoModal, setInfoMessage } = usePackageStore();
  const {
    clientStatus: { isLogin, isPickFile },
    getOrder,
    updateOrder,
  } = usePackageStore();

  const userId = window.localStorage.getItem("deliOrderUserId");
  const deliOrderToken = window.localStorage.getItem("deliOrderToken");
  const authorization = "Bearer " + deliOrderToken;

  const notifyLoginRequired = () => {
    setInfoMessage(GUIDE_MESSAGES.REQUIRE_LOGIN);
    openInfoModal();
  };

  const handleAddBookmark = async () => {
    if (!isLogin) {
      notifyLoginRequired();
      return;
    }

    const BookmarkTarget = getOrder();

    if (!validateRequiredInputs(BookmarkTarget)) {
      setInfoMessage(GUIDE_MESSAGES.BOOKMARK_REQUIREMENT);
      openInfoModal();
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
            ...(deliOrderToken && { authorization }),
          },
        },
      );

      setInfoMessage(response.data.message);
      openInfoModal();
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
            openInfoModal();
            break;
        }
      } else {
        console.error("서버 응답 에러 :", error);
        setInfoMessage("일시적 서버 에러입니다. 잠시 후 다시 시도해주세요");
        openInfoModal();
      }

      openInfoModal();
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
            ...(deliOrderToken && { authorization }),
          },
        },
      );

      setBookMarks(response.data.bookmarkList);
      openBookmarkList();
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
        console.error("서버 응답 에러 :", error);
        setInfoMessage("일시적 서버 에러입니다. 잠시 후 다시 시도해주세요");
      }

      openInfoModal();
    }
  };

  const applyBookmark = (index) => {
    delete bookmarks[index]._id;
    delete bookmarks[index].updatedAt;
    delete bookmarks[index].createdAt;

    updateOrder(bookmarks[index]);
    closeBookmarkList();
  };

  const validateRequiredInputs = (inputs) => {
    const requiredField = isPickFile
      ? ["action", "attachmentName", "executionPath"]
      : ["action", "executionPath"];
    return requiredField.every((field) => inputs[field].length > 0);
  };

  return (
    <>
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
      <Modal
        title={"즐겨찾기 목록"}
        isOpen={isBookmarkListOpen}
        onClose={closeBookmarkList}
      >
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
      </Modal>
    </>
  );
}

export default BookmarkToolbar;
