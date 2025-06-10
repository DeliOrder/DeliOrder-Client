import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "./main.css";
import App from "./Components/App";

createRoot(document.getElementById("root") as HTMLElement).render(
  <HashRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </HashRouter>,
);
