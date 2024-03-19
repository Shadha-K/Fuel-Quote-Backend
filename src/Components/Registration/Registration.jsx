import React, { useState } from 'react';
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

    // Validation logic...
  };

  const handleAddress1Change = (e) => {
    const newAddress1 = e.target.value;
    setAddress1(newAddress1);

    // Validation logic...
  };

  const handleAddress2Change = (e) => {
    setAddress2(e.target.value);
  };

  const handleCityChange = (e) => {
    const newCity = e.target.value;
    setCity(newCity);

    // Validation logic...
  };

  const handleStateChange = (e) => {
    setState(e.target.value);

    // Validation logic...
  };

  const handleZipcodeChange = (e) => {
    const newZipcode = e.target.value;
    setZipcode(newZipcode);

    // Validation logic...
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form submission logic...
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
            type="fullname"
            id="fullName"
            placeholder="Full Name"
            value={fullName}
            onChange={handleFullNameChange}
            className="w-72 bg-transparent focus:outline-none text-gray-700 text-lg"
          />
          {fullNameError && <div className='error text-red-500'>{fullNameError}</div>}
        </div>

        {/* Address input fields */}
        {/* House icon */}
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
        
        {/* House icon */}
        <div className="input flex items-center w-96 h-16 bg-gray-200 rounded-md mt-4">
          <img src={house_icon} width={25} height={25} alt='' className='mx-3' />
          <input
            id="address2"
            placeholder="Address 2"
            value={address2}
            onChange={handleAddress2Change}
            className="w-72 bg-transparent focus:outline-none text-gray-700 text-lg"
          />
        </div>
        
        {/* City input field */}
        {/* City icon */}
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

        {/* State input field */}
        {/* State icon */}
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

        {/* Zipcode input field */}
        {/* Location icon */}
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

      <p className="redirect-text">
        You will be redirected to the login page after registering.
      </p>

      <div className="submit-container">
        <button type="submit" className="submit-button bg-indigo-800 text-white w-48 h-16 flex justify-center items-center" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default ClientProfileForm;
