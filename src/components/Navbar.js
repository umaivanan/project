import React from "react";
import './Navbar.css';
import { Link } from 'react-router-dom';
import logo from '/home/ukijaffna/Documents/project/my-final/src/assets/lo2.jpg';

const Navbar = () => {
  return (
    <nav className="main">
      <img src={logo} alt="my first" className="logo" />
      <ul>
        <li>explore the skill</li>
        <li>
          <Link to="/register">
            <button className="btn">setup skill share</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
