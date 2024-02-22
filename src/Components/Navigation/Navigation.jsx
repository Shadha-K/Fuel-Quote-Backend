// Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <div className="body">
      <Link to="/login-signup">Login/Signup</Link>
      <Link to="/registration">Registration</Link>
      <Link to="/userprofile">UserProfile</Link>
      <Link to="/userfuelrequest">FuelRequest</Link>
    </div>
  );
}

export default Navigation;
