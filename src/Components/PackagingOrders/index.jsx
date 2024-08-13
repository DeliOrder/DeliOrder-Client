import Orders from "./Orders";
import BookmarkToolbar from "./BookmarkToolbar";

function PackagingOrders() {
  return (
    <div class="relative flex min-h-screen flex-row justify-start justify-items-stretch overflow-hidden bg-gray-50 px-3 py-6 sm:py-12">
      <div class="relative w-2/5 bg-white px-6 pb-8 pt-10 shadow-sm ring-1 ring-gray-900/5 sm:ml-5 sm:max-w-lg sm:rounded-lg sm:px-10">
        <label class="mb-2 block text-xl font-bold text-gray-700">
          제조하기
        </label>
        <form>
          <label class="mb-2 block text-base font-semibold text-gray-500">
            행동 선택하기
          </label>
          <select
            name="action"
            class="focus:shadow-outline block w-full appearance-none rounded border border-gray-300 bg-white px-4 py-3 pr-8 leading-tight text-gray-400 hover:border-gray-300 hover:bg-gray-100 focus:cursor-pointer focus:outline-none"
          >
            <option value="">행동을 선택해주세요.</option>
            <option>생성하기</option>
            <option>이동하기</option>
            <option>삭제하기</option>
            <option>실행하기</option>
            <option>수정하기</option>
          </select>
          <div class="mx-auto max-w-md">
            <label class="mb-2 block justify-items-start text-base font-semibold text-gray-500">
              경로 선택하기
            </label>
            <button class="focus:shadow-outline block w-full rounded border border-gray-300 bg-white px-4 py-3 pr-8 leading-tight text-gray-400 hover:bg-gray-100 focus:cursor-pointer focus:outline-none">
              경로를 선택해 주세요.
            </button>
            <label class="mb-2 block text-base font-semibold text-gray-500">
              대상파일 선택하기
            </label>
            <input
              type="file"
              class="w-full cursor-pointer rounded border bg-white text-sm font-semibold text-gray-400 file:mr-4 file:cursor-pointer file:border-0 file:bg-gray-100 file:px-4 file:py-3 file:text-gray-500 file:hover:bg-gray-200"
            />
            <p class="mt-2 text-xs text-gray-400">
              PNG, JPG SVG, WEBP, and GIF are Allowed.
            </p>
          </div>
          <button class="my-3 w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
            조합하기
          </button>
          <BookmarkToolbar />
        </form>
      </div>
      <div class="relative w-3/5 bg-white px-6 pb-8 pt-10 shadow-sm ring-1 ring-gray-900/5 sm:mr-3 sm:max-w-full sm:rounded-lg sm:px-10">
        <label class="mb-2 block text-xl font-bold text-gray-700">
          조합현황
        </label>
        <div class="overflow-y-scroll">
          <Orders />
        </div>
        <button class="absolute bottom-3 right-5 my-3 rounded bg-blue-500 px-6 py-3 text-xl font-bold text-white hover:bg-blue-700">
          패키징하기
        </button>
      </div>
    </div>
  );
}

export default PackagingOrders;
