import BookmarkToolbar from "./BookmarkToolbar";

function CreatingOrder() {
  return (
    <div className="relative w-2/5 bg-white px-6 pb-8 pt-10 shadow-sm ring-1 ring-gray-900/5 sm:ml-5 sm:max-w-lg sm:rounded-lg sm:px-10">
      <label className="mb-2 block text-xl font-bold text-gray-700">
        제조하기
      </label>
      <form>
        <label className="mb-2 block text-base font-semibold text-gray-500">
          행동 선택하기
        </label>
        <select
          name="action"
          className="focus:shadow-outline block w-full appearance-none rounded border border-gray-300 bg-white px-4 py-3 pr-8 leading-tight text-gray-400 hover:border-gray-300 hover:bg-gray-100 focus:cursor-pointer focus:outline-none"
        >
          <option value="">행동을 선택해주세요.</option>
          <option>생성하기</option>
          <option>이동하기</option>
          <option>삭제하기</option>
          <option>실행하기</option>
          <option>수정하기</option>
        </select>
        <div className="mx-auto max-w-md">
          <label className="mb-2 block justify-items-start text-base font-semibold text-gray-500">
            경로 선택하기
          </label>
          <button className="focus:shadow-outline block w-full rounded border border-gray-300 bg-white px-4 py-3 pr-8 leading-tight text-gray-400 hover:bg-gray-100 focus:cursor-pointer focus:outline-none">
            경로를 선택해 주세요.
          </button>
          <label className="mb-2 block text-base font-semibold text-gray-500">
            대상파일 선택하기
          </label>
          <input
            type="file"
            className="w-full cursor-pointer rounded border bg-white text-sm font-semibold text-gray-400 file:mr-4 file:cursor-pointer file:border-0 file:bg-gray-100 file:px-4 file:py-3 file:text-gray-500 file:hover:bg-gray-200"
          />
          <p className="mt-2 text-xs text-gray-400">
            PNG, JPG SVG, WEBP, and GIF are Allowed.
          </p>
        </div>
        <button className="my-3 w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
          조합하기
        </button>
        <BookmarkToolbar />
      </form>
    </div>
  );
}

export default CreatingOrder;
