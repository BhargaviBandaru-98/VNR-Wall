import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Navbar.css'
import logo from '../assets/VNR_WALL.png'

const Navbar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem('user')
    setIsLoggedIn(!!user)
  }, [])

  const toggleNav = () => {
    setIsNavExpanded(!isNavExpanded)
  }

  const handleLogout = (e) => {
    e.preventDefault() // Prevent the default Link navigation behavior

    // Remove user data from localStorage
    localStorage.removeItem('user')

    // Update the state to reflect the logout status
    setIsLoggedIn(false)

    // Close the navigation menu
    setIsNavExpanded(false)

    // Redirect to home page (or any other page you want)
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={logo} alt="VNR Wall Logo" className="logo" />
        <span>VNR WALL: THE VERIFY ZONE</span>
      </div>
      <div className="hamburger" onClick={toggleNav}>
        ☰
      </div>
      <ul className={`nav-links ${isNavExpanded ? 'active' : ''}`}>
        <li><Link to="/" onClick={() => setIsNavExpanded(false)}>Home</Link></li>
        <li><Link to="/submit" onClick={() => setIsNavExpanded(false)}>Submit Info</Link></li>
        <li><Link to="/responses" onClick={() => setIsNavExpanded(false)}>View Responses</Link></li>
        {isLoggedIn ? (
          <li><Link to="/login" onClick={() => setIsNavExpanded(false)}>Profile</Link></li>
        ) : (
          <li><Link to="/login" onClick={() => setIsNavExpanded(false)}>Login</Link></li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
