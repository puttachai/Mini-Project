import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // ✅ เพิ่ม Routes & Route
import "./index.css";
import App from "./App.jsx";
import Home from "./Home.jsx";
import OrderStatus from "./OrderStatus.jsx";
import Login from "./Login.jsx";

import Navbar from "./Navbar.jsx";
import Products from "./products.jsx";
// import Login from "./Login";
// import Cal_grade from "./Cal_grade";
// import TeamCard from "./TeamCard";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/navbar" element={<Navbar />}>
            {/* <Route path="/navbar/products" element={<Products />} />
            <Route path="/navbar/login" element={<Login />} /> */}
            {/* <Route path="/navbar/contect" element={<Cal_grade />} />
            <Route path="/navbar/cal_grade" element={<TeamCard />} /> */}
          </Route> 
          <Route path="/navbar/products" element={<Products />} />
          <Route path="/navbar/login" element={<Login />} />
          <Route index element={<Home />} /> {/* Default route */}
          <Route path="login" element={<Login />} />
          <Route path="order-status" element={<OrderStatus />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
