import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginSignup from './Components/LoginSignup/LoginSignup';
import Registration from './Components/Registration';
import Profile from './Components/UserProfile';
import FuelRequest from './Components/FuelRequest';
import EditProfile from './Components/EditProfile/EditProfile';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login-signup" component={LoginSignup} />
        <Route path="/registration" component={Registration} />
        <Route path="/profile" component={Profile} />
        <Route path="/fuel-request" component={FuelRequest} />
        <Route path = '/edit-profile' element = {EditProfile}/>
      </Switch>
    </Router>
  );
}

export default App;
