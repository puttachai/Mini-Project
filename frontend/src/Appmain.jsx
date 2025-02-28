import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import OrderStatus from "./OrderStatus";
import Login from "./Login";

function Appmain() {
  return (
    <Routes> {/* ✅ ใช้ Routes ครอบ Route */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/order-status" element={<OrderStatus />} />
    </Routes>
  );
}

export default Appmain;
