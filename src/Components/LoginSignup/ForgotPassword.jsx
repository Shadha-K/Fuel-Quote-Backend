import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import user_icon from '../Assets/person.png';
import password_icon from '../Assets/password.png';
import checkmark_icon from '../Assets/checkmark.png';

const ForgotPassword = () => {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [usernameValid, setUsernameValid] = useState(false);
  const [newPasswordValid, setNewPasswordValid] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

  const handleNewPasswordChange = (e) => {
    const newPasswordValue = e.target.value;
    setNewPassword(newPasswordValue);

    if (!newPasswordValue.trim()) {
      setNewPasswordError('New Password is required');
      setNewPasswordValid(false);
    } else if (newPasswordValue.length < 4) {
      setNewPasswordError('Password must be greater than 4 characters');
      setNewPasswordValid(false);
    } else if (newPasswordValue.length > 20) {
      setNewPasswordError('Password must be less than 20 characters');
      setNewPasswordValid(false);
    } else if (!/(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]/.test(newPasswordValue)) {
      setNewPasswordError('Password must contain at least one letter, number, and symbol');
      setNewPasswordValid(false);
    } else {
      setNewPasswordError('');
      setNewPasswordValid(true);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);

    if (!confirmPasswordValue.trim()) {
      setConfirmPasswordError('Confirm Password is required');
      setConfirmPasswordValid(false);
    } else if (confirmPasswordValue !== newPassword) {
      setConfirmPasswordError('Passwords do not match');
      setConfirmPasswordValid(false);
    } else {
      setConfirmPasswordError('');
      setConfirmPasswordValid(true);
    }
  };

  const handleValidation = () => {
    let isValid = true;

    if (!username.trim()) {
      setUsernameError('Username is required');
      setUsernameValid(false);
      isValid = false;
    } else if (username.length < 4 || username.length > 20 || !/^[a-zA-Z0-9_.-]+$/.test(username)) {
      setUsernameError('Invalid username format');
      setUsernameValid(false);
      isValid = false;
    } else {
      setUsernameError('');
      setUsernameValid(true);
    }

    if (!newPassword.trim()) {
      setNewPasswordError('New Password is required');
      setNewPasswordValid(false);
      isValid = false;
    } else if (newPassword.length < 4 || newPassword.length > 20 || !/(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]/.test(newPassword)) {
      setNewPasswordError('Invalid password format');
      setNewPasswordValid(false);
      isValid = false;
    } else {
      setNewPasswordError('');
      setNewPasswordValid(true);
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError('Confirm Password is required');
      setConfirmPasswordValid(false);
      isValid = false;
    } else if (confirmPassword !== newPassword) {
      setConfirmPasswordError('Passwords do not match');
      setConfirmPasswordValid(false);
      isValid = false;
    } else {
      setConfirmPasswordError('');
      setConfirmPasswordValid(true);
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (handleValidation() === true) {
      try {
        const response = await axios.put('http://localhost:3000/api/auth/update-password', { username, newPassword });
        console.log(response);
        setError('');
        setSuccess('Successfully updated password');
        setTimeout(() => {
          window.location.href = "/login-signup";
        }, 1000);
      } catch (error) {
        if (error.response.data.error === 'Username not found') {
          setError('Please enter a valid username.');
        } else {
          console.error('Forgot Password failed:', error.response.data);
          setError('Failed to reset password');
        }
      }
    } else {
      setError('Invalid input. Please fix the errors.');
    }
  };    

  return (
    <div className='container sm:max-w-2xl mx-auto px-20 py-16'>
      <div className='header flex flex-col items-center'>
        <div className='text text-4xl font-bold text-indigo-800'>Forgot Password</div>
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
            placeholder='New Password'
            value={newPassword}
            onChange={handleNewPasswordChange}
            className='w-72 bg-transparent focus:outline-none text-gray-700 text-lg'
          />
          {newPasswordError && <div className='error text-red-500'>{newPasswordError}</div>}
          {newPasswordValid && <img src={checkmark_icon} width={25} height={25} alt='checkmark' />}
        </div>
        <div className='input flex items-center w-96 h-16 bg-gray-200 rounded-md mt-4'>
          <img src={password_icon} width={25} height={25} alt='' className='mx-3' />
          <input
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className='w-72 bg-transparent focus:outline-none text-gray-700 text-lg'
          />
          {confirmPasswordError && <div className='error text-red-500'>{confirmPasswordError}</div>}
          {confirmPasswordValid && <img src={checkmark_icon} width={25} height={25} alt='checkmark' />}
        </div>
      </div>
      <div className='submit-container flex justify-between mt-12'>
        <div className='submit bg-indigo-800 text-white w-48 h-16 flex justify-center items-center' onClick={handleSubmit}>Submit</div>
        <Link to="/login-signup" className='submit bg-gray-400 text-gray-700 w-48 h-16'>Cancel</Link>
      </div>
      {error && <div className='error-message text-red-500 mt-4'>{error}</div>}
      {success && <div className='error-message text-green-500 mt-4'>{success}</div>}
    </div>
  );
};

export default ForgotPassword;
