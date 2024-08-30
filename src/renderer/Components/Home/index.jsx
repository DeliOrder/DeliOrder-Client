import axios from "axios";
import { useEffect } from "react";
import { signInWithCustomToken } from "firebase/auth";
import { useNavigate, useSearchParams } from "react-router-dom";

import { auth } from "@renderer/services/firebaseService/firebase.js";
import usePackageStore from "@renderer/store";

import { COMMON_ALERT } from "@renderer/constants/messages";
import deliMan from "@images/deliMan.png";

function Home() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setClientStatus, openInfoModal, setInfoMessage } = usePackageStore();

  const notifyInfoMessage = (message) => {
    setInfoMessage(message);
    openInfoModal();
  };

  useEffect(() => {
    const getJwtToken = async () => {
      try {
        const authCode = searchParams.get("code");

        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/auth/sign-in/kakao`,
          { authCode },
        );

        const {
          firebaseToken,
          deliOrderToken,
          deliOrderRefreshToken,
          userId,
          loginType,
        } = response.data;

        await signInWithCustomToken(auth, firebaseToken);

        window.localStorage.setItem("deliOrderToken", deliOrderToken);
        window.localStorage.setItem(
          "deliOrderRefreshToken",
          deliOrderRefreshToken,
        );
        window.localStorage.setItem("deliOrderUserId", userId);
        window.localStorage.setItem("deliOrderAuthProvider", loginType);

        setClientStatus({ isLogin: true });
        navigate("/");
      } catch (error) {
        console.error("카카오 로그인 실패: ", error);
        notifyInfoMessage(COMMON_ALERT.SERVER_ERROR_TRY_AGAIN);
      }
    };

    if (searchParams.get("code")) {
      getJwtToken();
    }
  }, [searchParams, setClientStatus, navigate]);

  const navigateToReceivingPage = () => {
    navigate("/package/receiving");
  };

  const navigateToCreatePage = () => {
    navigate("/package/new");
  };

  return (
    <div className="flex flex-1 items-center justify-center overflow-y-auto bg-white">
      <div className="flex w-1/2 flex-col items-center justify-between">
        <button
          onClick={navigateToCreatePage}
          className="bg-green-bright hover:bg-yellow-bright m-7 w-3/5 rounded-full p-7 text-3xl font-semibold text-black"
        >
          보내기
        </button>
        <button
          onClick={navigateToReceivingPage}
          className="bg-green-bright hover:bg-yellow-bright m-7 w-3/5 rounded-full p-7 text-3xl font-semibold text-black"
        >
          받기
        </button>
      </div>
      <div className="flex w-1/2 items-center justify-center">
        <img src={deliMan} className="mr-40" alt="DeliOrder logo" />
      </div>
    </div>
  );
}

export default Home;
