import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import Favorites from './components/Favorites';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Feedback from './components/Feedback';
import About from './components/About';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Router>
      <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
        <Navbar 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode}
          user={user}
          onLogout={handleLogout}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:genre" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route 
            path="/favorites" 
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            } 
          />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/about" element={<About />} />
          <Route 
            path="/login" 
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            } 
          />
          <Route 
            path="/signup" 
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Signup onLogin={handleLogin} />
              )
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 