import { Link } from "react-router-dom";
import axios from "axios";

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

  const notifyInfoMessage = () => {
    setInfoMessage(GUIDE_MESSAGES.REQUIRE_LOGIN);
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
    <nav className="bg-blue-medium sticky top-0 z-10 flex flex-shrink-0 flex-wrap items-center justify-between p-6">
      <div className="mr-6 flex flex-shrink-0 items-center text-white">
        <Link
          to="/"
          className="flex items-center text-xl font-semibold tracking-tight"
        >
          <img src={DeliLogo} className="logo size-10" alt="DeliOrder logo" />
          DELIORDER
        </Link>
      </div>
      <div className="block w-full flex-grow lg:flex lg:w-auto lg:items-center">
        <div className="text-sm lg:flex-grow">
          <Link
            to="/introduction"
            className="hover:text-yellow-bright mr-4 text-lg text-white"
          >
            소개
          </Link>
          <Link
            to="/package/new"
            className="hover:text-yellow-bright mr-4 text-lg text-white"
          >
            보내기
          </Link>
          <Link
            to="/package/receiving"
            className="hover:text-yellow-bright text-lg text-white"
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
