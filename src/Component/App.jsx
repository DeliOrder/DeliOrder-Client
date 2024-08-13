import { Route, Routes } from "react-router-dom";

import Home from "./Home";
import Nav from "./Nav";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
