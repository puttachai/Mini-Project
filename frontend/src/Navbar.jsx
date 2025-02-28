import React from 'react';
import './Navbar.css'; // นําเข้า Navbar.css สําหรับการตกแต่ง
import { Link } from 'react-router-dom';

function Navbar() {
return (
    <nav className="navbar">
        <div className="logo">Mini Project</div>
        <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/navbar/products">products</Link></li>
            <li><Link to="/navbar/login">Login</Link></li>
            {/* <li><Link to="/navbar/contect">Contect</Link></li>
            <li><Link to="/navbar/cal_grade">Calculator Grade</Link></li> */}
            {/* <li><Link to="/navbar/about">About</Link></li>
            <li><Link to="/navbar/teamCard">TeamCard</Link></li>
            <li><Link to="/navbar/contect">Contect</Link></li>
            <li><Link to="/navbar/cal_grade">Calculator Grade</Link></li> */}
        </ul>
    </nav>
);
}

export default Navbar;