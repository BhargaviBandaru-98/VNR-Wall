import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Navbar.css'
import logo from '../assets/VNR_WALL.png'
import { FaHome, FaEnvelopeOpenText, FaListAlt, FaUser } from 'react-icons/fa'

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem('user')
    setIsLoggedIn(!!user)
  }, [])

  return (
    <>
      {/* Main Top Navbar with Logo */}
      <nav className="navbar">
        <div className="navbar-brand">
          <img src={logo} alt="VNR Wall Logo" className="logo" />
          <span>VNR WALL: THE VERIFY ZONE</span>
        </div>
      </nav>

      {/* Navigation Buttons Row Below Navbar */}
      <div className="nav-buttons">
        <Link to="/" className="nav-btn">
          <FaHome className="nav-icon" /> Home
        </Link>
        <Link to="/submit" className="nav-btn">
          <FaEnvelopeOpenText className="nav-icon" /> Submit Info
        </Link>
        <Link to="/responses" className="nav-btn">
          <FaListAlt className="nav-icon" /> View Responses
        </Link>
        <Link to="/login" className="nav-btn">
          <FaUser className="nav-icon" /> {isLoggedIn ? 'Profile' : 'Login'}
        </Link>
      </div>
    </>
  )
}

export default Navbar
