import { Link } from "react-router-dom";
import axios from "axios";

import usePackageStore from "@renderer/store";
import { getAuth, signOut } from "firebase/auth";

import DeliLogo from "../../assets/images/logo.png";

function Nav() {
  const {
    clientStatus: { isLogin },
    setClientStatus,
  } = usePackageStore();

  const handleLogOut = async () => {
    if (!isLogin) return;

    let auth;

    try {
      const loginType = window.localStorage.getItem("deliOrderProvider");
      const deliOrderUserId = window.localStorage.getItem("deliOrderUserId");

      switch (loginType) {
        case "kakao":
          try {
            await axios.post(
              `${import.meta.env.VITE_SERVER_URL}/auth/sign-out/kakao`,
              { deliOrderUserId, loginType },
            );
          } catch (error) {
            console.error("카카오 로그아웃 에러: ", error);
          }
          break;
        case "google":
        case "local":
          try {
            auth = getAuth();
            await signOut(auth);
          } catch (error) {
            console.error("파이어베이스 로그아웃 에러: ", error);
          }
          break;
      }

      window.localStorage.clear();
      setClientStatus({ isLogin: false });
    } catch (error) {
      // TODO: 추후 에러처리 관련 구현
      alert(error.message);
    }
  };

  return (
    <nav className="flex flex-wrap items-center justify-between bg-blue-700 p-6">
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
          <Link to="/" className="text-teal-hover-white mr-4">
            소개
          </Link>
          <Link to="/package/new" className="text-teal-hover-white mr-4">
            보내기
          </Link>
          <Link to="/package/receiving" className="text-teal-hover-white">
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
