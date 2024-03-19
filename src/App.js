// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Components/Navigation/Navigation'; // Import the navigation CSS file
import './Components/Navigation/Navigation.css';


import HomePage from './Components/HomePage/HomePage';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import Registration from './Components/Registration/Registration';
import UserProfile from './Components/UserProfile/UserProfile';
import UserFuelRequest from './Components/UserFuelRequest/UserFuelRequest'
import EditProfile from './Components/EditProfile/EditProfile';

function Navigation() {
  return (
    <nav>
      <ul>
        
        <li><Link to="/homepage">HomePage</Link></li>
        <li><Link to="/login-signup">Login/Signup</Link></li>
        <li><Link to="/registration">Registration</Link></li>
        <li><Link to="/profile">UserProfile</Link></li>
        <li><Link to="/userfuelrequest">UserFuelRequest</Link></li>
        
      </ul>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<HomePage/>}/>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/login-signup" element={<LoginSignup />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/userfuelrequest" element={<UserFuelRequest />} />
        <Route path = '/edit-profile' element = {<EditProfile/>}/>
      </Routes>
      
      <Navigation />
    </Router>
  );
}

export default App;
