import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SubNavbar from './components/SubNavbar';
import HomePage from './pages/HomePage';
import SubmitPage from './pages/SubmitPage';
import ViewResponsesPage from  './pages/ViewResponsePage';
import Login from './pages/Login';
import './App.css'
import NavigationBar from './components/NavigationBar';
function App() {
  return (
    <Router>
      <div className="app">
        <NavigationBar />
        <SubNavbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/submit" element={<SubmitPage />} />
          <Route path="/responses" element={<ViewResponsesPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;