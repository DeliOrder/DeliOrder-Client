import DeliLogo from "../../assets/images/logo.png";

function Home() {
  return (
    <div className="flex h-[90.5vh] items-center justify-between bg-blue-100">
      <div className="flex w-1/2 flex-col items-center justify-between">
        <button className="m-7 w-3/5 rounded-full bg-blue-500 p-7 text-3xl text-white hover:bg-blue-700">
          보내기
        </button>
        <button className="m-7 w-3/5 rounded-full bg-blue-500 p-7 text-3xl text-white hover:bg-blue-700">
          받기
        </button>
      </div>
      <div className="flex w-1/2 items-center justify-center">
        <img src={DeliLogo} className="size-3/5" alt="DeliOrder logo" />
      </div>
    </div>
  );
}

export default Home;
