import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

import usePackageStore from "@renderer/store";

import Home from "./Home";
import Nav from "./Nav";
import Login from "./Login";
import SignUp from "./SignUp";
import ReceivingPackage from "./ReceivingPackage";
import CreatingPackage from "./CreatingPackage";
import MyPackages from "./MyPackages";
import refreshToken from "../utils/refreshToken";
import InfoModal from "./Modal/InfoModal";

function App() {
  const { setClientStatus } = usePackageStore();

  const hasPreviousLoginInfo = () => {
    const deliOrderToken = window.localStorage.getItem("deliOrderToken");
    const deliOrderUserId = window.localStorage.getItem("deliOrderUserId");
    const deliOrderAuthProvider = window.localStorage.getItem(
      "deliOrderAuthProvider",
    );
    return deliOrderToken && deliOrderUserId && deliOrderAuthProvider;
  };

  useEffect(() => {
    const validateToken = async () => {
      try {
        const deliOrderToken = window.localStorage.getItem("deliOrderToken");

        if (!hasPreviousLoginInfo()) {
          window.localStorage.clear();
          return;
        }

        const authorization = "Bearer " + deliOrderToken;
        axios.get(`${import.meta.env.VITE_SERVER_URL}/auth/token/validate`, {
          headers: {
            authorization,
          },
        });
        setClientStatus({ isLogin: true });
      } catch (error) {
        console.error("앱초기진입 로그인에러: ", error);
        if (error.name !== "TokenExpiredError") {
          window.localStorage.clear();
          setClientStatus({ isLogin: false });
          return;
        }

        try {
          await refreshToken();
        } catch (refreshError) {
          console.error("토큰 갱신 중 오류 발생: ", refreshError);
          window.localStorage.clear();
          setClientStatus({ isLogin: false });
        }
      }
    };

    validateToken();
  }, [setClientStatus]);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex min-h-screen flex-col">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/package/new" element={<CreatingPackage />} />
          <Route path="/package/receiving" element={<ReceivingPackage />} />
          <Route path="/myPackages" element={<MyPackages />} />
        </Routes>
        <InfoModal />
      </div>
    </div>
  );
}

export default App;
