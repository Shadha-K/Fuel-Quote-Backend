// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Components/Navigation/Navigation'; // Import the navigation CSS file
import './Components/Navigation/Navigation.css';

import LoginSignup from './Components/LoginSignup/LoginSignup';
import Registration from './Components/Registration/Registration';
import Profile from './Components/Profile/script';
import FuelRequest from './Components/FuelRequest/script';

function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link to="/login-signup">Login/Signup</Link></li>
        <li><Link to="/registration">Registration</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/fuel-request">Fuel Request</Link></li>
      </ul>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login-signup" element={<LoginSignup />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/fuel-request" element={<FuelRequest />} />
      </Routes>

      <Navigation />
    </Router>
  );
}

export default App;
