import React, { useState } from 'react';
import axios from 'axios';
import './LoginSignup.css';

import user_icon from '../Assets/person.png';
import password_icon from '../Assets/password.png';
import checkmark_icon from '../Assets/checkmark.png';

const LoginSignup = () => {
  const [action, setAction] = useState('Sign Up');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameValid, setUsernameValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [error, setError] = useState('');

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
  
    if (!newUsername.trim()) {
      setUsernameError('Username is required');
      setUsernameValid(false);
    } else if (newUsername.length < 4) {
      setUsernameError('Username must be greater than 4 characters');
      setUsernameValid(false);
    } else if (newUsername.length > 20) {
      setUsernameError('Username must be less than 20 characters');
      setUsernameValid(false);
    } else if (!/^[a-zA-Z0-9_.-]+$/.test(newUsername)) {
      setUsernameError('Invalid characters. Use only letters, numbers, dots, dashes, or underscores.');
      setUsernameValid(false);
    } else {
      setUsernameError('');
      setUsernameValid(true);
    }
  };     

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (!newPassword.trim()){
      setPasswordError('Password is required');
      setPasswordValid(false);
    } else if (newPassword.length < 4){
      setPasswordError('Password must be greater than 4 characters');
      setPasswordValid(false);
    } else if (newPassword.length > 20){
      setPasswordError('Password must be less than 20 characters');
      setPasswordValid(false);
    } else if (!/(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]/.test(newPassword)){
      setPasswordError('Password must contain at least one letter, number, and symbol');
      setPasswordValid(false);
    } else {
      setPasswordError(''); 
      setPasswordValid(true);
    }
  };

  const handleValidation = () => {
    let isValid = true;
  
    if (!username.trim()) {
      setUsernameError('Username is required');
      setUsernameValid(false);
      isValid = false;
    } else if (username.length < 4 || username.length > 20) {
      setUsernameError('Username must be between 4 and 20 characters');
      setUsernameValid(false);
      isValid = false;
    } else if (!/^[a-zA-Z0-9_.-]+$/.test(username)) {
      setUsernameError('Invalid characters. Use only letters, numbers, dots, dashes, or underscores.');
      setUsernameValid(false);
      isValid = false;
    } else {
      setUsernameError('');
      setUsernameValid(true);
    }
  
    if (!password.trim()) {
      setPasswordError('Password is required');
      setPasswordValid(false);
      isValid = false;
    } else if (password.length < 4 || password.length > 20) {
      setPasswordError('Password must be between 4 and 20 characters');
      setPasswordValid(false);
      isValid = false;
    } else if (!/(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]/.test(password)) {
      setPasswordError('Password must contain at least one letter, one number, and one special character');
      setPasswordValid(false);
      isValid = false;
    } else {
      setPasswordError('');
      setPasswordValid(true);
    }
  
    return isValid;
  };
  
  const handleSwitchAction = (newAction) => {
    setAction(newAction);
    setUsername(''); // Reset username
    setPassword(''); // Reset password
    setUsernameError(''); // Reset username error
    setPasswordError(''); // Reset password error
    setUsernameValid(false);
    setPasswordValid(false);
  };

  const handleSubmit = async () => {
    if (handleValidation() === true) {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', { username, password }); // Make a POST request to login endpoint
        console.log('Login successful:', response.data);
        // Display redirecting message
        setError('Redirecting...');
        // Handle successful login (e.g., redirect to dashboard)
        // For demonstration purposes, you can use window.location.href to redirect
        // Replace '/dashboard' with the actual URL you want to redirect to
      } catch (error) {
        console.error('Login failed:', error.response.data);
        // Handle login error (e.g., display error message)
        setError('Invalid username or password');
      }
    } else {
      // Display invalid credentials message
      setError('Invalid credentials');
      console.log('Invalid input. Please fix the errors.');
    }
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>{action}</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        <div className='input'>
          <img src={user_icon} width={25} height={25} alt='' />
          <input
            type='username'
            placeholder='Username'
            value={username}
            onChange={handleUsernameChange}
          />
          {usernameError && <div className='error'>{usernameError}</div>}
          {usernameValid && <img src={checkmark_icon} width={25} height={25} alt='checkmark' />}
          </div>
        <div className='input'>
          <img src={password_icon} width={25} height={25} alt='' />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && <div className='error'>{passwordError}</div>}
          {passwordValid && <img src={checkmark_icon} width={25} height={25} alt='checkmark' />}
        </div>
      </div>
      {action === 'Sign Up' ? <div></div> : <div className='forgot-password'>Forgot Password? <span>Click Here</span></div>}
      <div className='submit-container'>
        <div className={action === 'Login' ? 'submit gray' : 'submit'} onClick={() => handleSwitchAction('Sign Up')}>Sign Up</div>
        <div className={action === 'Sign Up' ? 'submit gray' : 'submit'} onClick={() => handleSwitchAction('Login')}>Login</div>
      </div>
      {error && <div className='error-message'>{error}</div>}
      <div className='submit' onClick={handleSubmit}>Submit</div>
    </div>
  );
};

export default LoginSignup;
