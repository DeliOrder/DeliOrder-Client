import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import DeliLogo from "../../assets/images/logo.png";

function Home({ setIsLogIn }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    const getJwtToken = async () => {
      try {
        const authCode = searchParams.get("code");
        const {
          data: { jwtToken, refreshToken, target_id, _id },
        } = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/auth/sign-in/kakao`,
          { authCode },
        );
        window.localStorage.setItem("jwtToken", jwtToken);
        window.localStorage.setItem("refreshToken", refreshToken);
        window.localStorage.setItem("targetId", target_id);
        window.localStorage.setItem("userId", _id);
      } catch (error) {
        // TODO: 추후 에러관련 처리
        throw new Error(error);
      } finally {
        setIsLogIn(true);
      }
    };

    if (searchParams.get("code")) {
      getJwtToken();
    }
  }, [searchParams, setIsLogIn]);

  const navigateToReceivingPage = () => {
    navigate("/package/receiving");
  };

  const navigateToCreatePage = () => {
    navigate("/package/new");
  };

  return (
    <div className="flex h-[90.5vh] items-center justify-between bg-blue-100">
      <div className="flex w-1/2 flex-col items-center justify-between">
        <button
          onClick={navigateToCreatePage}
          className="m-7 w-3/5 rounded-full bg-blue-500 p-7 text-3xl text-white hover:bg-blue-700"
        >
          보내기
        </button>
        <button
          onClick={navigateToReceivingPage}
          className="m-7 w-3/5 rounded-full bg-blue-500 p-7 text-3xl text-white hover:bg-blue-700"
        >
          받기
        </button>
      </div>
      <div className="flex w-1/2 items-center justify-center">
        <img src={DeliLogo} className="size-3/5" alt="DeliOrder logo" />
      </div>
    </div>
  );
}

Home.propTypes = {
  setIsLogIn: PropTypes.func.isRequired,
};

export default Home;
