import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FuelRequest = () => {
  const [gallonsRequested, setGallonsRequested] = useState(1);
  const [dateRequested, setDateRequested] = useState('2024-01-01');
  const [totalPrice, setTotalPrice] = useState(0.5);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/profile/profile');

      const userProfile = response.data;
      const { username, address_1, address_2, city, state, zipcode } = userProfile;
      const formattedAddress = `${address_1}, ${address_2 ? address_2 + ', ' : ''}${city}, ${state} ${zipcode}`;

      setDeliveryAddress(formattedAddress);
      setUsername(username);
      console.log("Address 1 is set as ", address_1);
      console.log("Just set username as ", username);
      console.log("Username should be ", userProfile.username);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    updateTotalPrice();
  }, [gallonsRequested, dateRequested]);

  const updateTotalPrice = () => {
    const totalPriceValue = parseFloat(gallonsRequested) * 0.50;
    setTotalPrice(totalPriceValue.toFixed(2));
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
      console.log("About to POST fuel request for user ", username);
      const newQuoteData = {
        username,
        gallonsRequested,
        deliveryAddress,
        deliveryDate: dateRequested,
        pricePerGallon: 0.50, 
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
              onChange={(e) => setGallonsRequested(e.target.value)}
              required
              className="w-full bg-gray-200 px-3 py-1 rounded"
            />
          </div>
          <div className="input flex items-center mb-4">
            <label htmlFor="dateRequested" className="mr-2">Date Requested:</label>
            <input
              type="date"
              id="dateRequested"
              name="dateRequested"
              value={dateRequested}
              onChange={(e) => setDateRequested(e.target.value)}
              min="2024-01-01"
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
              value="$0.50"
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
        <div className="flex justify-between">
          <button type="submit" className=" mt-4 px-6 py-3 bg-indigo-800 text-white font-semibold rounded-lg shadow-md hover:bg-purple-900 focus:outline-none focus:bg-purple-900 transition duration-300 ease-in-out">Submit</button>
          <button type="button" onClick={handleCancel} className="mt-4 px-6 py-3 bg-white text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition duration-300 ease-in-out">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default FuelRequest;
