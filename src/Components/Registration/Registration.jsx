import React, { useState } from 'react';
import './Registration.css';

import user_icon from '../Assets/person.png'
import house_icon from '../Assets/house4.webp'
import city_icon from '../Assets/city.png'
import state_icon from '../Assets/state.png'
import location_icon from '../Assets/location3.png'

const ClientProfileForm = () => {
  const [fullName, setFullName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');

  const [fullNameError, setFullNameError] = useState('');
  const [address1Error, setAddress1Error] = useState('');
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

  const handleFullNameChange = (e) => {
    const newName = e.target.value;
    setFullName(newName);

    if (!newName.trim()) {
      setFullNameError('Full Name is required');
    } else if (newName.length > 50) {
      setFullNameError('Full Name must be 50 characters or less');
    } else {
      setFullNameError('');
    }
  };

  const handleAddress1Change = (e) => {
    const newAddress1 = e.target.value;
    setAddress1(newAddress1);

    if (!newAddress1.trim()) {
      setAddress1Error('Address 1 is required');
    } else if (newAddress1.length > 100) {
      setAddress1Error('Address 1 must be 100 characters or less');
    } else {
      setAddress1Error('');
    }
  };

  const handleAddress2Change = (e) => {
    setAddress2(e.target.value);
  };

  const handleCityChange = (e) => {
    const newCity = e.target.value;
    setCity(newCity);

    if (!newCity.trim()) {
      setCityError('City is required');
    } else if (newCity.length > 100) {
      setCityError('City must be 100 characters or less');
    } else {
      setCityError('');
    }
  };

  const handleStateChange = (e) => {
    setState(e.target.value);

    // Clear state error when a valid selection is made
    if (e.target.value !== '') {
      setStateError('');
    }
  };

  const handleZipcodeChange = (e) => {
    const newZipcode = e.target.value;
    setZipcode(newZipcode);

    if (!newZipcode.trim()) {
      setZipcodeError('Zipcode is required');
    } else if (newZipcode.length < 5 || newZipcode.length > 9) {
      setZipcodeError('Zipcode must be between 5 and 9 characters');
    } else {
      setZipcodeError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form before submission
    if (
      !fullName.trim() ||
      !address1.trim() ||
      !city.trim() ||
      state === '' ||
      (zipcode.trim().length < 5 || zipcode.trim().length > 9)
    ) {
      alert('Please fill in the required fields correctly.');
      return;
    }

    // Perform further actions with the form data (e.g., send to server)
    console.log('Client Full Name:', fullName);
    console.log('Address 1:', address1);
    console.log('Address 2:', address2);
    console.log('City:', city);
    console.log('State:', state);
    console.log('Zipcode:', zipcode);

    // You can add additional logic here, such as sending the data to a server
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <div className='header'>
        <div className='text'>Complete your Profile</div>
        <div className='underline'></div>
      </div>

      <div className="inputs">
      <div className = "input">
      <img src={user_icon} width={25} height={25} alt='' />
        <input
          type="fullname"
          id="fullName"
          placeholder="Full Name"
          value={fullName}
          onChange={handleFullNameChange}
          className="form-input"
        />
        {fullNameError && <div className='error'>{fullNameError}</div>}
      </div>

      <div className = "input">
      <img src={house_icon} width={25} height={25} alt='' />
        <input
          id="address1"
          placeholder="Address 1"
          value={address1}
          onChange={handleAddress1Change}
        />
        {address1Error && <div className='error'>{address1Error}</div>}
      </div>

      <div className = "input">
      <img src={house_icon} width={25} height={25} alt='' />
        <input
          id="address2"
          placeholder="Address 2"
          value={address2}
          onChange={handleAddress2Change}
        />
      </div>

      <div className = "input">
      <img src={city_icon} width={25} height={25} alt='' />
        <input
          type="text"
          placeholder="City"
          id="city"
          value={city}
          onChange={handleCityChange}
        />
        {cityError && <div className='error'>{cityError}</div>}
      </div>

      <div className = "input">
      <img src={state_icon} width={25} height={25} alt='' />
        <label htmlFor="state">State: </label>
        <select id="state" value={state} onChange={handleStateChange}>
          <option value="" disabled>Select State</option>
          {statesList.map((stateCode) => (
            <option key={stateCode} value={stateCode}>{stateCode}</option>
          ))}
        </select>
        {stateError && <div className='error'>{stateError}</div>}
      </div>

      <div className = "input">
      <img src={location_icon} width={25} height={25} alt='' />
        <input
          type="text"
          id="zipcode"
          placeholder="Zipcode"
          value={zipcode}
          onChange={handleZipcodeChange}
        />
        {zipcodeError && <div className='error'>{zipcodeError}</div>}
      </div>
      </div>

      <div className = "submit-container">
        <button type="submit" className="submit-button">
          Submit
        </button>
      </div>
    </form>
  );

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fullName">Client Full Name:</label>
        <input
          type="text"
          id="fullName"
          value={fullName}
          onChange={handleFullNameChange}
        />
        {fullNameError && <div className='error'>{fullNameError}</div>}
      </div>

      <div>
        <label htmlFor="address1">Address 1:</label>
        <textarea
          id="address1"
          value={address1}
          onChange={handleAddress1Change}
        />
        {address1Error && <div className='error'>{address1Error}</div>}
      </div>

      <div>
        <label htmlFor="address2">Address 2:</label>
        <textarea
          id="address2"
          value={address2}
          onChange={handleAddress2Change}
        />
      </div>

      <div>
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={handleCityChange}
        />
        {cityError && <div className='error'>{cityError}</div>}
      </div>

      <div>
        <label htmlFor="state">State:</label>
        <select id="state" value={state} onChange={handleStateChange}>
          <option value="" disabled>Select State</option>
          {statesList.map((stateCode) => (
            <option key={stateCode} value={stateCode}>{stateCode}</option>
          ))}
        </select>
        {stateError && <div className='error'>{stateError}</div>}
      </div>

      <div>
        <label htmlFor="zipcode">Zipcode:</label>
        <input
          type="text"
          id="zipcode"
          value={zipcode}
          onChange={handleZipcodeChange}
        />
        {zipcodeError && <div className='error'>{zipcodeError}</div>}
      </div>

      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default ClientProfileForm;
