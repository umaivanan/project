import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
// import logo from '/home/ukijaffna/Documents/project/my-final/src/assets/lo2.jpg';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by checking the token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Clear the token from localStorage and update state
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="main">
      {/* <img src={logo} alt="Smart Swap Logo" className="logo" /> */}
      <ul>
        {!isLoggedIn ? (
          <li>
            <Link to="/register">
              <button className="btn">Setup Skill Share</button>
            </Link>
          </li>
        ) : (
          <>
            <li>
              <Link to="/skill-form">
                <button className="btn">Create Profile</button>
              </Link>
            </li>
            <li>
              <button className="btn" onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;