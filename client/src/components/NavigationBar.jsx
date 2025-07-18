import React from "react";
import { Link } from "react-router-dom";
import './Navi.css'
import logo from '../assets/VNR_WALL.png'
import '../styles/Navbar.css'
import { FaHome, FaEnvelopeOpenText, FaListAlt, FaUser, FaBars } from 'react-icons/fa'
import { useState,useEffect } from "react";
function NavigationBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
  
    useEffect(() => {
      const user = localStorage.getItem('user')
      setIsLoggedIn(!!user)
      
      const checkScreenSize = () => {
        setIsMobile(window.innerWidth < 1024)
      }
      
      checkScreenSize()
      window.addEventListener('resize', checkScreenSize)
      
      return () => window.removeEventListener('resize', checkScreenSize)
    }, [])
  return (
    <div className="navbar navbar-expand-md  p-2 ">
      <Link className="navbar-brand" to="">
        <img src={logo} alt="VNR Wall Logo" className="logo" />
        VNR WALL 
      </Link>
      
      <button
        className="navbar-toggler ms-5  "
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse justify-content-end "
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav  pr-5  ">
          <li className="nav-item ">
            <Link className="nav-link" to="" >
             <FaHome className="nav-icon" /> Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="submit">
             <FaEnvelopeOpenText className="nav-icon" /> Submit Info
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="responses">
              <FaListAlt className="nav-icon" /> View Responses
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="login">
              <FaUser className="nav-icon" /> {isLoggedIn ? 'Profile' : 'Login'}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavigationBar;