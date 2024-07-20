import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage'
import HomePage from './Pages/HomePage';

import './App.css';

function App() {
  const isLoggedIn = true; // Replace with your logic to check if the user is logged in
  return (
      <Router>
        <Routes>
          {isLoggedIn ? (
            <Route exact path="/" element={<HomePage />} />
          ) : (
            <Route exact path="/" element={<LoginPage />} />
          )}
        </Routes>
      </Router>
    );
  }

export default App;

