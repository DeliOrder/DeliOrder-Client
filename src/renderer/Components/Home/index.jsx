import axios from "axios";
import { useEffect } from "react";
import { signInWithCustomToken } from "firebase/auth";
import { useNavigate, useSearchParams } from "react-router-dom";

import { auth } from "../../../../firebase";
import usePackageStore from "@renderer/store";

import { GUIDE_MESSAGES } from "../../constants/messages";
import DeliLogo from "@renderer/assets/images/logo.png";

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
        console.errors("카카오 로그인 실패: ", error);
        notifyInfoMessage(GUIDE_MESSAGES.SERVER_ERROR_TRY_AGAIN);
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

export default Home;
