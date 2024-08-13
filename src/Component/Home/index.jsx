import DeliLogo from "../../assets/images/logo.png";

function Home() {
  return (
    <div className="flex justify-between bg-blue-100 items-center h-[90.5vh]">
      <div className="flex justify-between items-center w-1/2 flex-col">
        <button className="w-3/5 bg-blue-500 hover:bg-blue-700 text-white text-3xl p-7 m-7 rounded-full">
          보내기
        </button>
        <button className="w-3/5 bg-blue-500 hover:bg-blue-700 text-white text-3xl p-7 m-7 rounded-full">
          받기
        </button>
      </div>
      <div className="flex justify-center items-center w-1/2">
        <img src={DeliLogo} className="size-3/5" alt="DeliOrder logo" />
      </div>
    </div>
  );
}

export default Home;
