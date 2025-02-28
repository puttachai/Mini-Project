import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ✅ Import BrowserRouter
import "./index.css";
import App from "./App.jsx";
// import Navbar from "./NavbarSimple.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter> {/* ✅ ครอบ <App /> ด้วย BrowserRouter */}
      {/* <Navbar /> */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
