import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FuelRequest = () => {
  const [gallonsRequested, setGallonsRequested] = useState('');
  const [dateRequested, setDateRequested] = useState('2024-01-01');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [userState, setUserState] = useState('');
  const [username, setUsername] = useState('');
  const [pricePerGallon, setPricePerGallon] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [gallonsError, setGallonsError] = useState('');
  const currentDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/profile/profile');

      const userProfile = response.data;
      const { address_1, address_2, city, state, zipcode, username } = userProfile;
      setUserState(state);
      const formattedAddress = `${address_1}, ${address_2 ? address_2 + ', ' : ''}${city}, ${state} ${zipcode}`;

      setDeliveryAddress(formattedAddress);
      setUsername(username);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleGallonsChange = (e) => {
    const inputGallons = e.target.value;
    setGallonsRequested(inputGallons);
    setIsButtonDisabled(inputGallons === '');
    
    if (inputGallons < 0) {
      setGallonsError('Gallons requested must be a positive number.');
    } else {
      setGallonsError('');
    }
  };

  const handleGetQuote = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/fuel-quote/fuel-quote/preview', {
        username: username,
        userState: userState,
        gallonsRequested: parseInt(gallonsRequested) 
      });

      const { pricePerGallon, totalAmountDue } = response.data;
      setPricePerGallon(pricePerGallon.toFixed(2));
      setTotalPrice(totalAmountDue.toFixed(2));
    } catch (error) {
      console.error('Error getting fuel quote:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); 
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      const newQuoteData = {
        username,
        gallonsRequested,
        deliveryAddress,
        userState,
        deliveryDate: dateRequested,
        pricePerGallon,
        totalAmountDue: totalPrice
      };
      const response = await axios.post('http://localhost:3000/api/fuel-quote/fuel-quote', newQuoteData, config);
      console.log('Quote created successfully:', response.data);
      window.location.href = '/profile';
    } catch (error) {
      console.error('Error creating quote:', error);
    }
  };

  const handleCancel = () => {
    window.location.href = '/profile';
  };

  useEffect(() => {
    fetchUserProfile();
    const currentDate = new Date().toISOString().split('T')[0];
    setDateRequested(currentDate);
  }, []);
  

  return (
    <div className='container sm:max-w-2xl mx-auto px-20 py-16'>
      <div className='header text-center mb-5'>
        <div className='text text-3xl font-bold text-indigo-800'>Gas Order Form</div>
        <div className='underline w-24 h-1 bg-indigo-800'></div>
      </div>
      <form id="gasOrderForm" onSubmit={handleSubmit} className="w-full">
        <div className='inputs'>
          <div className="input flex items-center mb-4">
            <label htmlFor="gallonsRequested" className="mr-2">Gallons Requested:</label>
            <input
              type="number"
              id="gallonsRequested"
              name="gallonsRequested"
              min="1"
              value={gallonsRequested}
              onChange={handleGallonsChange}
              required
              className="w-full bg-gray-200 px-3 py-1 rounded"
            />
            {gallonsError && <p className="text-red-500">{gallonsError}</p>}
          </div>
          <div className="input flex items-center mb-4">
            <label htmlFor="dateRequested" className="mr-2">Date Requested:</label>
            <input
            type="date"
            id="dateRequested"
            name="dateRequested"
            value={dateRequested}
            onChange={(e) => setDateRequested(e.target.value)}
            min={currentDate} 
            required
            className="w-full bg-gray-200 px-3 py-1 rounded"
          />
          </div>
          <div className="input flex items-center mb-4">
            <label htmlFor="deliveryAddress" className="mr-2">Delivery Address:</label>
            <input
              type="text"
              id="deliveryAddress"
              name="deliveryAddress"
              value={deliveryAddress}
              readOnly
              className="w-full bg-gray-200 px-3 py-1 rounded"
            />
          </div>
          <div className="input flex items-center mb-4">
            <label htmlFor="pricePerGallon" className="mr-2">Price per Gallon:</label>
            <input
              type="text"
              id="pricePerGallon"
              name="pricePerGallon"
              value={`$${pricePerGallon}`}
              readOnly
              className="w-full bg-gray-200 px-3 py-1 rounded"
            />
          </div>
          <div className="input flex items-center mb-4">
            <label htmlFor="totalPrice" className="mr-2">Total Amount Due:</label>
            <input
              type="text"
              id="totalPrice"
              name="totalPrice"
              value={`$${totalPrice}`}
              readOnly
              className="w-full bg-gray-200 px-3 py-1 rounded"
            />
          </div>
        </div>
        
        <button type="button" onClick={handleGetQuote} disabled={isButtonDisabled} className="mr-4 mt-4 px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-900 focus:outline-none focus:bg-gray-900 transition duration-300 ease-in-out">Get Fuel Quote</button>
        <button type="submit" disabled={isButtonDisabled} className="ml-4 mr-10 mt-4 px-6 py-3 bg-indigo-800 text-white font-semibold rounded-lg shadow-md hover:bg-purple-900 focus:outline-none focus:bg-purple-900 transition duration-300 ease-in-out ml-0">Submit</button>
        <button type="button" onClick={handleCancel} className="ml-20 mt-4 px-6 py-3 bg-white text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition duration-300 ease-in-out">Cancel</button>
      </form>
    </div>
  );
};

export default FuelRequest;