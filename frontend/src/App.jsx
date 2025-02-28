import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";'./Navbar'
import './App.css';

function App() {
  return (
    <div>
      <Navbar />
      {/* <h1>My Website</h1> */}
      <Outlet /> {/* ✅ แสดงเนื้อหา Page ตาม Route */}
    </div>
  );
}

export default App;
