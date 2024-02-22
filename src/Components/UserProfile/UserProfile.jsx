import React, { useEffect } from 'react';
import './UserProfile.css'; // Make sure to adjust the path if necessary
import placeholder_icon from '../Assets/Portrait_Placeholder.png';
import city_banner from '../Assets/citybanner2.jpg'

const UserProfile = () => {
  useEffect(() => {
    const ordersTable = document.getElementById('recentOrders');
    const noOrdersMessage = document.getElementById('noOrdersMessage');
  
    // Check if the user has made any orders
    // For demo purpose, let's assume orders is an empty array
    const orders = [];
  
    if (orders.length === 0) {
      // Hide orders table and show message
      ordersTable.style.display = 'none';
      noOrdersMessage.style.display = 'block';
    } else {
      // Show orders table and hide message
      ordersTable.style.display = 'block';
      noOrdersMessage.style.display = 'none';
      // Populate orders table with data from orders array
      const orderRows = document.getElementById('orderRows');
      orders.forEach(function(order) {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${order.gallonsRequested}</td>
          <td>${order.dateRequested}</td>
          <td>$${order.pricePerGallon.toFixed(2)}</td>
          <td>$${order.totalAmount.toFixed(2)}</td>
        `;
        orderRows.appendChild(row);
      });
    }
  }, []);

  const redirectToFuelQuoteForm = () => {
    window.location.href = "fuel_quote_form.html";
  };

  const updateMyInformation = () => {
    alert("Redirecting to update information page...");
  };

  return (
    <div className="container">
      <img src={city_banner} alt="Banner" className="banner-image" />
      <div className="user-info">
        <img src={placeholder_icon} alt="User Profile" className="user-picture" />

        <div className="user-details">
            <div className="user-full-name">John Doe</div>
            <div className="user-username">@johndoe</div>

        <div className="user-information">
                <div className="user-info-line">
                    <span className="attribute-name">Street:</span>
                    <span>123 Main St</span>
                </div>
                <div className="user-info-line">
                    <span className="attribute-name">City, ST:</span>
                    <span>City, ST 12345</span>
                </div>
            </div>
    </div>
      </div>
      <button className = "update-info-button" onClick={updateMyInformation}>Edit Profile</button>
      <div id="recentOrders">
        <h2>Fuel Quote History</h2>
        {/* Table for fuel quote history will be here */}
      </div>
      <p id="noOrdersMessage" className = "fuel-request-message" style={{ display: 'none' }}>You have made no fuel requests. If you would like to request fuel, click the button below.</p>
      <button className = "fuel-quote-button" onClick={redirectToFuelQuoteForm}>Request Fuel</button>
    </div>
  );
};

export default UserProfile;
