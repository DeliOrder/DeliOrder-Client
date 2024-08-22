import axios from "axios";
import { useState } from "react";

import usePackageStore from "@renderer/store";
import Modal from "../../../Modal";

import addingIcon from "@images/addingIcon.svg";
import downloadIcon from "@images/downloadIcon.svg";

function BookmarkToolbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookmarks, setBookMarks] = useState([]);
  const {
    clientStatus: { isLogin },
    getOrder,
    updateOrder,
  } = usePackageStore();

  const userId = localStorage.getItem("userID");
  const notifyLoginRequired = () => {
    alert("로그인 유저 전용 기능입니다.");
  };

  const handleAddBookmark = async () => {
    if (!isLogin) {
      notifyLoginRequired();
      return;
    }
    const BookmarkTarget = getOrder();
    const formattedBookmarkData = {
      ...BookmarkTarget,
      attachmentType: "",
      attachmentUrl: "",
    };

    await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/${userId}/bookmark`,
      formattedBookmarkData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  };

  const handleGetBookmark = async () => {
    if (!isLogin) {
      notifyLoginRequired();
      return;
    }
    const BookmarkTarget = getOrder();
    const result = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/${userId}/bookmark`,
      BookmarkTarget,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    setBookMarks(result);
    setIsModalOpen(true);
  };

  const applyBookmark = (index) => {
    updateOrder(bookmarks[index]);
    setIsModalOpen(false);
  };

  return (
    <>
      {bookmarks.length > 0 && (
        <Modal isOpen={isModalOpen}>
          {bookmarks.map((bookmark, index) => (
            <button
              key={bookmark.attachmentName}
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
