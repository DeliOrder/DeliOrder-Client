function BookmarkToolbar() {
  return (
    <>
      <span className="block content-center pb-1 pt-3 text-lg font-bold text-gray-700">
        즐겨찾기
      </span>
      <div className="flex flex-row justify-around py-1">
        <div className="flex flex-row">
          <span className="block content-center px-3 text-sm text-gray-500">
            추가하기
          </span>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border-none bg-blue-600 outline-none hover:bg-blue-700 active:bg-blue-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14px"
              fill="#fff"
              className="inline"
              viewBox="0 0 512 512"
              alt="add-bookmark-icon"
            >
              <path
                d="M467 211H301V45c0-24.853-20.147-45-45-45s-45 20.147-45 45v166H45c-24.853 0-45 20.147-45 45s20.147 45 45 45h166v166c0 24.853 20.147 45 45 45s45-20.147 45-45V301h166c24.853 0 45-20.147 45-45s-20.147-45-45-45z"
                data-original="#000000"
              />
            </svg>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16px"
              fill="#fff"
              className="inline"
              viewBox="0 0 24 24"
              alt="bookmark icon"
            >
              <path
                d="M12 16a.749.749 0 0 1-.542-.232l-5.25-5.5A.75.75 0 0 1 6.75 9H9.5V3.25c0-.689.561-1.25 1.25-1.25h2.5c.689 0 1.25.561 1.25 1.25V9h2.75a.75.75 0 0 1 .542 1.268l-5.25 5.5A.749.749 0 0 1 12 16zm10.25 6H1.75C.785 22 0 21.215 0 20.25v-.5C0 18.785.785 18 1.75 18h20.5c.965 0 1.75.785 1.75 1.75v.5c0 .965-.785 1.75-1.75 1.75z"
                data-original="#000000"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

export default BookmarkToolbar;
