import { Route, Routes } from "react-router-dom";

import Home from "./Home";
import Nav from "./Nav";
import Login from "./Login";
import SignUp from "./SignUp";
import ReceivingPackage from "./RecevingPackage";
import CreatingPackage from "./CreatingPackage";

function App() {
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
        </Routes>
      </div>
    </div>
  );
}

export default App;
