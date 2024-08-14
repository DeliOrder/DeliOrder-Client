import { useNavigate } from "react-router-dom";

import DeliLogo from "../../assets/images/logo.png";

function Home() {
  const navigate = useNavigate();

  const navigateToRecevingPage = () => {
    navigate("/package/receiving");
  };

  const navigateToCreatePage = () => {
    navigate("/package/new");
  };

  return (
    <div className="flex justify-between bg-blue-100 items-center h-[90.5vh]">
      <div className="flex justify-between items-center w-1/2 flex-col">
        <button
          onClick={navigateToCreatePage}
          className="w-3/5 bg-blue-500 hover:bg-blue-700 text-white text-3xl p-7 m-7 rounded-full">
          보내기
        </button>
        <button
          onClick={navigateToRecevingPage}
          className="w-3/5 bg-blue-500 hover:bg-blue-700 text-white text-3xl p-7 m-7 rounded-full"
        >
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
