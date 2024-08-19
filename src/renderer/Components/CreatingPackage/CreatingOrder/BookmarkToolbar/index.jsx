import axios from "axios";

import usePackageStore from "@renderer/store";

import addingIcon from "@images/addingIcon.svg";
import downloadIcon from "@images/downloadIcon.svg";

function BookmarkToolbar() {
  const getOrder = usePackageStore((state) => state.getOrder);
  const BookmarkTarget = getOrder();

  const handleAddBookmark = () => {
    // TODO: 유저아이디 받아오는 로직 추가 구현 필요
    axios.post(
      `${import.meta.env.VITE_SERVER_URL}/${"user-id"}/bookmark`,
      BookmarkTarget,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  };
  return (
    <>
      <span className="label-large">즐겨찾기</span>
      <div className="flex flex-row justify-around py-1">
        <div className="flex flex-row">
          <span className="block content-center px-3 text-sm text-gray-500">
            추가하기
          </span>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border-none bg-blue-600 outline-none hover:bg-blue-700 active:bg-blue-600"
            onClick={handleAddBookmark}
          >
            <img src={addingIcon} alt="adding Icon" />
          </button>
        </div>
        <div className="flex flex-row">
          <span className="block content-center px-3 text-sm text-gray-500">
            가져오기
          </span>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded border-none bg-yellow-400 outline-none hover:bg-yellow-600 active:bg-yellow-500"
          >
            <img src={downloadIcon} alt="download Icon" />
          </button>
        </div>
      </div>
    </>
  );
}

export default BookmarkToolbar;
