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
  const [theme, setTheme] = useState('dark');
  const themeBtnRef = useRef(null);
  const themeIconRef = useRef(null);

  // Load saved or system theme
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const current = saved || (prefersDark ? 'dark' : 'light');
    setTheme(current);
  }, []);

  // Apply theme via [data-theme] and store
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      if (themeBtnRef.current && themeIconRef.current) {
        if (newTheme === 'light') {
          themeBtnRef.current.style.backgroundColor = 'lightgrey';
          themeIconRef.current.style.left = '-50%';
          themeIconRef.current.style.transition = 'all 0.3s ease';
        } else {
          themeBtnRef.current.style.backgroundColor = '#D7AEFB';
          themeIconRef.current.style.left = '50%';
          themeIconRef.current.style.transition = 'all 0.3s ease';
        }
      }
      return newTheme;
    });
  };

  return (
    <Router>
      <div className="app">
        <NavigationBar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/submit" element={<SubmitPage />} />
          <Route path="/responses" element={<ViewResponsesPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {/* Toggle Theme Button */}
        <div style={{ textAlign: 'right', padding: '0.5rem 1rem' }}>
          <button ref={themeBtnRef} onClick={toggleTheme} className="theme-toggle-btn">
            <div
              ref={themeIconRef}
              className="theme-icon"
              style={{ position: 'relative' }}
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
