import axios, { AxiosError } from "axios";
import { useState } from "react";

import Modal from "../../../Modal";
import BookmarkList from "./BookmarkList";

import usePackageStore, { OrderType } from "@renderer/store";
import useModal from "@renderer/hooks/useModal";
import refreshToken from "@renderer/services/utils/refreshToken";

import addingIcon from "@images/addingIcon.svg";
import downloadIcon from "@images/downloadIcon.svg";
import { COMMON_ALERT, GUIDE_MESSAGES } from "@renderer/constants/messages";

export interface ExtendedOrderType extends OrderType {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}

function BookmarkToolbar() {
  const [bookmarks, setBookMarks] = useState<Array<ExtendedOrderType>>([]);
  const [isBookmarkListOpen, openBookmarkList, closeBookmarkList] = useModal();

  const { openInfoModal, setInfoMessage } = usePackageStore();
  const {
    clientStatus: { isLogin },
    getOrder,
  } = usePackageStore();

  const userId = window.localStorage.getItem("deliOrderUserId");
  const deliOrderToken = window.localStorage.getItem("deliOrderToken");
  const authorization = "Bearer " + deliOrderToken;

  const notifyLoginRequired = () => {
    setInfoMessage(GUIDE_MESSAGES.REQUIRE_LOGIN);
    openInfoModal();
  };

  const validateRequiredInputs = (inputs: ExtendedOrderType) => {
    return Boolean(inputs.action && inputs.executionPath);
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
      if (error instanceof AxiosError && error.response) {
        const { error: errorMessage, message } = error.response.data;

        switch (errorMessage) {
          case "Token expired": {
            const deliOrderUserId =
              window.localStorage.getItem("deliOrderUserId");

            if (!deliOrderUserId) {
              throw "로컬스토리지에 유저Id가 없습니다.";
            }

            await refreshToken(deliOrderUserId);
            handleAddBookmark();
            break;
          }
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
        setInfoMessage(COMMON_ALERT.SERVER_ERROR_TRY_AGAIN);
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
      if (error instanceof AxiosError && error.response) {
        const { error: errorMessage, message } = error.response.data;

        switch (errorMessage) {
          case "Token expired":
            try {
              const deliOrderUserId =
                window.localStorage.getItem("deliOrderUserId");

              if (!deliOrderUserId) {
                throw "로컬스토리지에 유저Id가 없습니다.";
              }

              await refreshToken(deliOrderUserId);
              handleAddBookmark();
            } catch (error) {
              console.error("토큰 갱신중에 오류가 발생하였습니다.", error);
            }
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
        setInfoMessage(COMMON_ALERT.SERVER_ERROR_TRY_AGAIN);
      }

      openInfoModal();
    }
  };

  return (
    <>
      <span className="label-large">즐겨찾기</span>
      <div className="flex flex-row justify-around py-1">
        <div className="flex flex-row">
          <span className="text-sm-gray-centered font-bold">추가하기</span>
          <button
            type="button"
            className="button-green-bright"
            onClick={handleAddBookmark}
          >
            <img src={addingIcon} alt="adding Icon" />
          </button>
        </div>
        <div className="flex flex-row">
          <span className="text-sm-gray-centered font-bold">가져오기</span>
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
        title="즐겨찾기 목록"
        isOpen={isBookmarkListOpen}
        onClose={closeBookmarkList}
      >
        <BookmarkList
          bookmarks={bookmarks}
          closeBookmarkList={closeBookmarkList}
        />
      </Modal>
    </>
  );
}

export default BookmarkToolbar;
