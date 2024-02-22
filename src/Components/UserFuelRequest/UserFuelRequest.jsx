import React, { useEffect, useState } from 'react';
import './UserFuelRequest.css'

const FuelRequest = () => {
  const [gallonsRequested, setGallonsRequested] = useState(1);
  const [dateRequested, setDateRequested] = useState('2024-01-01');
  const [totalPrice, setTotalPrice] = useState(0.5);

  useEffect(() => {
    updateTotalPrice();
  }, [gallonsRequested, dateRequested]);

  const updateTotalPrice = () => {
    const totalPriceValue = parseFloat(gallonsRequested) * 0.50;
    setTotalPrice(totalPriceValue.toFixed(2));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  return (
    <div className="container">
      <div className='header'>
        <div className='text'>Gas Order Form</div>
        <div className = 'underline'></div>
      </div>
      <form id="gasOrderForm" onSubmit={handleSubmit}>
        <div className = 'inputs'>
        <div className="input">
          <label htmlFor="gallonsRequested">Gallons Requested:</label>
          <input
            type="number"
            id="gallonsRequested"
            name="gallonsRequested"
            min="1"
            value={gallonsRequested}
            onChange={(e) => setGallonsRequested(e.target.value)}
            required
          />
        </div>
        <div className="input">
          <label htmlFor="dateRequested">Date Requested:</label>
          <input
            type="date"
            id="dateRequested"
            name="dateRequested"
            value={dateRequested}
            onChange={(e) => setDateRequested(e.target.value)}
            min="2024-01-01"
            required
          />
        </div>
        <div className="input">
          <label htmlFor="pricePerGallon">Price per Gallon:</label>
          <input
            type="text"
            id="pricePerGallon"
            name="pricePerGallon"
            value="$0.50"
            readOnly
          />
        </div>
        <div className="input">
          <label htmlFor="totalPrice">Total Amount Due:</label>
          <input
            type="text"
            id="totalPrice"
            name="totalPrice"
            value={`$${totalPrice}`}
            readOnly
          />
          </div>
          <button type = "submit" className = "submit-button">Submit</button>
        </div>
        </form>
    </div>
  );
};

export default FuelRequest;
