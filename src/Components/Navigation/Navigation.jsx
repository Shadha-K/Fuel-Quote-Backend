// Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <div>
      <Link to="/login-signup">Login/Signup</Link>
      <Link to="/registration">Registration</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/fuel-request">Fuel Request</Link>
    </div>
  );
}

export default Navigation;
