import React, { useState, useEffect } from 'react';
import user_icon from '../Assets/person.png';
import house_icon from '../Assets/house4.webp';
import city_icon from '../Assets/city.png';
import state_icon from '../Assets/state.png';
import location_icon from '../Assets/location3.png';
import axios from 'axios';

const ClientProfileForm = () => {
  const [fullName, setFullName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [fullNameError, setFullNameError] = useState('');
  const [address1Error, setAddress1Error] = useState('');
  const [address2Error, setAddress2Error] = useState('');
  const [cityError, setCityError] = useState('');
  const [stateError, setStateError] = useState('');
  const [zipcodeError, setZipcodeError] = useState('');

  const statesList = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  useEffect(() => {
    const storedUsername = localStorage.getItem('signupUsername');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    const storedPassword = localStorage.getItem('signupPassword');
    if (storedUsername){
      setPassword(storedPassword);
    }
  }, []);

  const handleFullNameChange = (e) => {
    const newName = e.target.value;
    setFullName(newName);
  
    if (newName.trim() === '') {
      setFullNameError('Full Name is required');
    } else if (newName.length > 50) {
      setFullNameError('Full name must be 50 characters or less');
    } else {
      setFullNameError('');
    }
  };

  const handleAddress2Change = (e) => {
    const newAddress2 = e.target.value;
    setAddress2(newAddress2);
  
    if (newAddress2.length > 100){
      setAddress2Error('Address 2 must be 100 characters or less');
    } else{
      setAddress2Error('');
    }
  };

  const handleAddress1Change = (e) => {
    const newAddress1 = e.target.value;
    setAddress1(newAddress1);

    if (newAddress1.trim() === '') {
      setAddress1Error('Address 1 is required');
    } else if (newAddress1.length > 100) {
      setAddress1Error('Address 1 must be 100 characters or less');
    } else {
      setAddress1Error('');
    }
  };

  const handleCityChange = (e) => {
    const newCity = e.target.value;
    setCity(newCity);
  
    if (newCity.trim() === '') {
      setCityError('City is required');
    } else if (newCity.length > 100) {
      setCityError('City must be 100 characters or less');
    } else {
      setCityError('');
    }
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const handleZipcodeChange = (e) => {
    const newZipcode = e.target.value;
    setZipcode(newZipcode);
  
    if (newZipcode.trim() === '') {
      setZipcodeError('Zipcode is required');
    } else if (newZipcode.length < 5 || newZipcode.length > 9) {
      setZipcodeError('Zipcode must be between 5 and 9 digits long');
    } else if (!/^\d+$/.test(newZipcode)) {
      setZipcodeError('Zipcode must be digits only');
    } else {
      setZipcodeError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (fullName.trim() === '') {
      setFullNameError('Full Name is required');
      return;
    }
    if (fullName.length > 50){
      setFullNameError('Full name must be 50 characters or less')
      return;
    }

    if (address1.trim() === '') {
      setAddress1Error('Address 1 is required');
      return;
    }
    if (address1.length > 100){
      setAddress1Error('Address 1 must be 100 characters or less')
      return;
    }

    if (address2.length > 100){
      setAddress2Error('Address 2 must be 100 characters or less')
      return;
    }

    if (city.trim() === '') {
      setCityError('City is required');
      return;
    }
    if (city.length > 100){
      setCityError('City must be 100 characters or less')
      return;
    }

    if (state === '') {
      setStateError('State is required');
      return;
    }

    if (zipcode.trim() === '') {
      setZipcodeError('Zipcode is required');
      return;
    }
    if (zipcode.length < 5 || zipcode.length > 9) {
      setZipcodeError(`Zipcode must be between 5 and 9 digits long`);
      return;
    }
    if (!/^\d+$/.test(zipcode)) {
      setZipcodeError(`Zipcode must be digits only`);
      return;
    }

    try {
      const userProfileData = {
        username,
        fullName,
        address1,
        address2: address2 || '', 
        city,
        state,
        zipcode
      };
      const response = await axios.post('http://localhost:3000/api/profile/complete-profile', userProfileData);
      console.log('Profile updated successfully:', response.data);
      window.location.href = '/profile';
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    window.location.href = '/login-signup';
  };

  return (
    <form onSubmit={handleSubmit} className='container sm:max-w-3xl mx-auto px-20 py-20'>
      <div className='header flex flex-col items-center'>
        <div className='text text-4xl font-bold text-indigo-800'>Complete your Profile</div>
        <div className='underline w-100 h-1 bg-indigo-800 rounded-full'></div>
      </div>

      <div className="inputs mt-10">
        <div className="input flex items-center w-96 h-16 bg-gray-200 rounded-md">
          <img src={user_icon} width={25} height={25} alt='' className='mx-3' />
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={() => {}}
            readOnly
            className="w-72 bg-transparent focus:outline-none text-gray-700 text-lg"
          />
        </div>

        <div className="input flex items-center w-96 h-16 bg-gray-200 rounded-md mt-4">
          <img src={user_icon} width={25} height={25} alt='' className='mx-3' />
          <input
            type="fullname"
            id="fullName"
            placeholder="Full Name"
            value={fullName}
            onChange={handleFullNameChange}
            className="w-72 bg-transparent focus:outline-none text-gray-700 text-lg"
          />
          {fullNameError && <div className='error text-red-500'>{fullNameError}</div>}
        </div>

        <div className="input flex items-center w-96 h-16 bg-gray-200 rounded-md mt-4">
          <img src={house_icon} width={25} height={25} alt='' className='mx-3' />
          <input
            id="address1"
            placeholder="Address 1"
            value={address1}
            onChange={handleAddress1Change}
            className="w-72 bg-transparent focus:outline-none text-gray-700 text-lg"
          />
          {address1Error && <div className='error text-red-500'>{address1Error}</div>}
        </div>
        
        <div className="input flex items-center w-96 h-16 bg-gray-200 rounded-md mt-4">
          <img src={house_icon} width={25} height={25} alt='' className='mx-3' />
          <input
            id="address2"
            placeholder="Address 2"
            value={address2}
            onChange={handleAddress2Change}
            className="w-72 bg-transparent focus:outline-none text-gray-700 text-lg"
          />
          {address2Error && <div className='error text-red-500'>{address2Error}</div>}
        </div>
        
        <div className="input flex items-center w-96 h-16 bg-gray-200 rounded-md mt-4">
          <img src={city_icon} width={25} height={25} alt='' className='mx-3' />
          <input
            type="text"
            placeholder="City"
            id="city"
            value={city}
            onChange={handleCityChange}
            className="w-72 bg-transparent focus:outline-none text-gray-700 text-lg"
          />
          {cityError && <div className='error text-red-500'>{cityError}</div>}
        </div>

        <div className="input flex items-center w-96 h-16 bg-gray-200 rounded-md mt-4">
          <img src={state_icon} width={25} height={25} alt='' className='mx-3' />
          <select
            id="state"
            value={state}
            onChange={handleStateChange}
            className="w-72 bg-transparent focus:outline-none text-gray-700 text-lg"
          >
            <option value="" disabled>Select State</option>
            {statesList.map((stateCode) => (
              <option key={stateCode} value={stateCode}>{stateCode}</option>
            ))}
          </select>
          {stateError && <div className='error text-red-500'>{stateError}</div>}
        </div>

        <div className="input flex items-center w-96 h-16 bg-gray-200 rounded-md mt-4">
          <img src={location_icon} width={25} height={25} alt='' className='mx-3' />
          <input
            type="text"
            id="zipcode"
            placeholder="Zipcode"
            value={zipcode}
            onChange={handleZipcodeChange}
            className="w-72 bg-transparent focus:outline-none text-gray-700 text-lg"
          />
          {zipcodeError && <div className='error text-red-500'>{zipcodeError}</div>}
        </div>
      </div>

      <div className="submit-container">
        <button type="submit" className="submit-button bg-indigo-800 text-white w-48 h-16 flex justify-center items-center" onClick={handleSubmit}>
          Submit
        </button>
        <button type="button" className="cancel-button bg-gray-400 text-gray-700 w-48 h-16 flex justify-center items-center" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ClientProfileForm;
