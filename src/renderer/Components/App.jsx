import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import usePackageStore from "@renderer/store";

import Home from "./Home";
import Nav from "./Nav";
import Login from "./Login";
import SignUp from "./SignUp";
import ReceivingPackage from "./ReceivingPackage";
import CreatingPackage from "./CreatingPackage";
import MyPackages from "./MyPackages";

function App() {
  const { setClientStatus } = usePackageStore();

  const hasPreviousLoginInfo = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    const jwtToken = localStorage.getItem("jwtToken");
    const userId = localStorage.getItem("userId");
    const targetId = localStorage.getItem("targetId");

    return refreshToken && jwtToken && userId && targetId;
  };

  useEffect(() => {
    if (hasPreviousLoginInfo()) {
      setClientStatus({ isLogin: true });
    } else {
      window.localStorage.clear();
    }
  }, [setClientStatus]);

  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/package/new" element={<CreatingPackage />} />
          <Route path="/package/receiving" element={<ReceivingPackage />} />
          <Route path="/myPackages" element={<MyPackages />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
