import { Link } from "react-router-dom";
import axios, { AxiosError } from "axios";

import usePackageStore from "@renderer/store";
import { getAuth, signOut } from "firebase/auth";

import DeliLogo from "../../assets/images/logo.png";
import { GUIDE_MESSAGES, COMMON_ALERT } from "@renderer/constants/messages";

function Nav() {
  const {
    clientStatus: { isLogin },
    setClientStatus,
  } = usePackageStore();

  const { openInfoModal, setInfoMessage } = usePackageStore();

  const notifyInfoMessage = (message = GUIDE_MESSAGES.REQUIRE_LOGIN) => {
    setInfoMessage(message);
    openInfoModal();
  };

  const handleLogOut = async () => {
    if (!isLogin) return;

    const loginType = window.localStorage.getItem("deliOrderAuthProvider");
    const deliOrderUserId = window.localStorage.getItem("deliOrderUserId");

    if (loginType === "kakao") {
      try {
        await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/auth/sign-out/kakao`,
          { deliOrderUserId, loginType },
        );
        window.localStorage.clear();
        setClientStatus({ isLogin: false });
      } catch (error) {
        console.error("카카오 로그아웃 실패: ", error);
        console.error("이메일 로그인 실패: ", error);
        if (
          error instanceof AxiosError &&
          error.response &&
          error.response.status >= 400 &&
          error.response.status < 500
        ) {
          notifyInfoMessage(COMMON_ALERT.INVALID_REQUEST);
        } else {
          notifyInfoMessage(COMMON_ALERT.SERVER_ERROR_TRY_AGAIN);
        }
      }
    } else {
      try {
        const auth = getAuth();
        await signOut(auth);
        window.localStorage.clear();
        setClientStatus({ isLogin: false });
      } catch (error) {
        console.error("파이어베이스 로그아웃 실패: ", error);
        notifyInfoMessage(COMMON_ALERT.SERVER_ERROR_TRY_AGAIN);
      }
    }
  };

  return (
    <nav className="sticky top-0 z-10 flex flex-shrink-0 flex-wrap items-center justify-between bg-blue-medium p-6">
      <div className="mr-6 flex flex-shrink-0 items-center text-white">
        <Link
          to="/"
          className="flex items-center text-xl font-semibold tracking-tight"
        >
          <img src={DeliLogo} className="logo size-10" alt="DeliOrder logo" />
          DELIORDER
        </Link>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center rounded border border-teal-400 px-3 py-2 text-teal-200 hover:border-white hover:text-white"></button>
      </div>
      <div className="block w-full flex-grow lg:flex lg:w-auto lg:items-center">
        <div className="text-sm lg:flex-grow">
          <Link
            to="/introduction"
            className="mr-4 text-lg text-white hover:text-yellow-bright"
          >
            소개
          </Link>
          <Link
            to="/package/new"
            className="mr-4 text-lg text-white hover:text-yellow-bright"
          >
            보내기
          </Link>
          <Link
            to="/package/receiving"
            className="text-lg text-white hover:text-yellow-bright"
          >
            받기
          </Link>
        </div>
        <div>
          {isLogin && (
            <Link to="/myPackages" className="button-white-border mr-6">
              내 소포함
            </Link>
          )}
          <Link
            to={isLogin ? "/" : "/login"}
            onClick={handleLogOut}
            className="button-white-border"
          >
            {isLogin ? "로그아웃" : "로그인"}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
