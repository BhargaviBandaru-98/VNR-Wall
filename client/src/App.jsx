import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SunMedium, MoonStar } from 'lucide-react';
import HomePage from './pages/HomePage';
import SubmitPage from './pages/SubmitPage';
import ViewResponsesPage from './pages/ViewResponsePage.jsx';
import Login from './pages/Login';
import './App.css';
import NavigationBar from './components/NavigationBar';
import './styles/theme.css';

function App() {
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'
  const themeBtnRef = useRef(null);
  const themeIconRef = useRef(null);

  // Detect initial theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    let initialTheme;
    if (savedTheme) {
      initialTheme = savedTheme;
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      initialTheme = prefersDark ? 'dark' : 'light';
    }
    setTheme(initialTheme);

    // Apply visual state to button immediately
    if (themeBtnRef.current && themeIconRef.current) {
      themeBtnRef.current.style.backgroundColor =
        initialTheme === 'light' ? 'lightgrey' : '#D7AEFB';
      themeIconRef.current.style.transform =
        initialTheme === 'light' ? 'translateX(0%)' : 'translateX(100%)';
    }
  }, []);

  // Listen for system theme changes if no manual override
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = e => {
      if (!localStorage.getItem('theme')) {
        const sysTheme = e.matches ? 'dark' : 'light';
        setTheme(sysTheme);
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply theme & save it whenever it changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle theme on button click
  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      if (themeBtnRef.current && themeIconRef.current) {
        themeBtnRef.current.style.backgroundColor =
          newTheme === 'light' ? 'lightgrey' : '#D7AEFB';
        themeIconRef.current.style.transform =
          newTheme === 'light' ? 'translateX(0%)' : 'translateX(100%)';
        themeIconRef.current.style.transition = 'all 0.3s ease';
      }
      return newTheme;
    });
  };

  return (
    <Router>
      <div className="app">
        {/* Navigation bar with mobile theme toggle */}
        <NavigationBar
          theme={theme}
          toggleTheme={toggleTheme}
          themeBtnRef={themeBtnRef}
          themeIconRef={themeIconRef}
        />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/submit" element={<SubmitPage />} />
          <Route path="/responses" element={<ViewResponsesPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {/* Desktop-only Theme Toggle */}
        <div className="desktop-only" >
          <button
            ref={themeBtnRef}
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label="Toggle Theme"
          >
            <div
              ref={themeIconRef}
              className="theme-icon"
            >
              {theme === 'light'
                ? <SunMedium size={24} />
                : <MoonStar size={24} />}
            </div>
          </button>
        </div>
      </div>
    </Router>
  );
}

export default App;
