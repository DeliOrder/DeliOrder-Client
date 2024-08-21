import { Route, Routes } from "react-router-dom";

import Home from "./Home";
import Nav from "./Nav";
import Login from "./Login";
import SignUp from "./SignUp";
import ReceivingPackage from "./ReceivingPackage";
import CreatingPackage from "./CreatingPackage";
import MyPackages from "./MyPackages";
import { useState } from "react";

function App() {
  const [isLogIn, setIsLogIn] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Nav isLogIn={isLogIn} setIsLogIn={setIsLogIn} />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home setIsLogIn={setIsLogIn} />} />
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
