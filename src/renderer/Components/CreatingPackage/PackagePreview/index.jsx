import Order from "./Order";

function PackagePreview() {
  return (
    <div className="relative w-3/5 bg-white px-6 pb-8 pt-10 shadow-sm ring-1 ring-gray-900/5 sm:mr-3 sm:max-w-full sm:rounded-lg sm:px-10">
      <label className="mb-2 block text-xl font-bold text-gray-700">
        패키지 미리보기
      </label>
      <div className="overflow-y-scroll">
        <Order />
      </div>
      <button className="absolute bottom-3 right-5 my-3 rounded bg-blue-500 px-6 py-3 text-xl font-bold text-white hover:bg-blue-700">
        패키징하기
      </button>
    </div>
  );
}

export default PackagePreview;
