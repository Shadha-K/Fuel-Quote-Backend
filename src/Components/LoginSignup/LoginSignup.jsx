import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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

    if (!newPassword.trim()) {
      setPasswordError('Password is required');
      setPasswordValid(false);
    } else if (newPassword.length < 4) {
      setPasswordError('Password must be greater than 4 characters');
      setPasswordValid(false);
    } else if (newPassword.length > 20) {
      setPasswordError('Password must be less than 20 characters');
      setPasswordValid(false);
    } else if (!/(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]/.test(newPassword)) {
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
    setUsername(''); 
    setPassword(''); 
    setUsernameError(''); 
    setPasswordError(''); 
    setUsernameValid(false);
    setPasswordValid(false);
  };

  const handleSubmit = async () => {
    if (handleValidation() === true) {
      try {
        if (action === 'Login') {
          const response = await axios.post('http://localhost:3000/api/auth/login', { username, password });
          console.log('Login successful:', response.data);
          const token = response.data.token;
          localStorage.setItem('token', token);
          const redirectTo = response.data.redirectTo;
          window.location.href = redirectTo; 
        } else {
          await handleSubmitSignup();
        }
      } catch (error) {
        console.error('Login failed:', error.response.data);
        setError('Invalid username or password');
      }
    } else {
      setError('Invalid credentials');
      console.log('Invalid input. Please fix the errors.');
    }
  };

  const handleSubmitSignup = async () => {
    if (handleValidation() === true) {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/register', { username, password });
        console.log('Signup successful:', response.data);
        localStorage.setItem('signupUsername', username);
        localStorage.setItem('signupPassword', password);
        setError('Signup successful! Please log in.'); 
      } catch (error) {
        console.error('Signup failed:', error.response.data);
        setError('Username is taken.');
      }
    }
  };

  return (
    <div className='container sm:max-w-2xl mx-auto px-20 py-16'>
      <div className='header flex flex-col items-center'>
        <div className='text text-4xl font-bold text-indigo-800'>{action}</div>
        <div className='underline w-20 h-1 bg-indigo-800 rounded-full'></div>
      </div>
      <div className='inputs mt-10'>
        <div className='input flex items-center w-96 h-16 bg-gray-200 rounded-md'>
          <img src={user_icon} width={25} height={25} alt='' className='mx-3' />
          <input
            type='username'
            placeholder='Username'
            value={username}
            onChange={handleUsernameChange}
            className='w-72 bg-transparent focus:outline-none text-gray-700 text-lg'
          />
          {usernameError && <div className='error text-red-500'>{usernameError}</div>}
          {usernameValid && <img src={checkmark_icon} width={25} height={25} alt='checkmark' />}
        </div>
        <div className='input flex items-center w-96 h-16 bg-gray-200 rounded-md mt-4'>
          <img src={password_icon} width={25} height={25} alt='' className='mx-3' />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={handlePasswordChange}
            className='w-72 bg-transparent focus:outline-none text-gray-700 text-lg'
          />
          {passwordError && <div className='error text-red-500'>{passwordError}</div>}
          {passwordValid && <img src={checkmark_icon} width={25} height={25} alt='checkmark' />}
        </div>
      </div>
      {action === 'Sign Up' ? <div></div> : <div className='forgot-password text-gray-700 text-lg mt-4'>Forgot Password? <Link to="/forgot-password" className='text-indigo-800 cursor-pointer'>Click Here</Link></div>}
      <div className='submit-container flex gap-8 mt-12'>
        <div className={action === 'Login' ? 'submit bg-gray-400 text-gray-700' : 'submit bg-indigo-800 text-white'} onClick={() => handleSwitchAction('Sign Up')}>Sign Up</div>
        <div className={action === 'Sign Up' ? 'submit bg-gray-400 text-gray-700' : 'submit bg-indigo-800 text-white'} onClick={() => handleSwitchAction('Login')}>Login</div>
      </div>
      {error && <div className='error-message text-red-500 mt-4'>{error}</div>}
      <div className='flex justify-between mt-4'>
        <div className='submit bg-indigo-800 text-white w-48 h-16 flex justify-center items-center' onClick={handleSubmit}>Submit</div>
        <Link to="/homepage" className='bg-gray-300 text-gray-700 px-6 py-3 flex justify-center items-center text-lg'>Return to Homepage</Link>
      </div>
    </div>
  );
};

export default LoginSignup;
