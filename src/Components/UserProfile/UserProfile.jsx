import React, { useEffect, useState } from 'react';
import placeholder_icon from '../Assets/Portrait_Placeholder.png';
import city_banner from '../Assets/citybanner2.jpg';
import axios from 'axios';

axios.interceptors.request.use(config => {
  // Retrieve JWT token from local storage
  const token = localStorage.getItem('token');
  // If token is present, add Authorization header
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const UserProfile = () => {
  const [profilePicture, setProfilePicture] = useState(placeholder_icon);
  const [fullName, setFullName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [quoteHistory, setQuoteHistory] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Fetch user profile data from the backend when the component mounts
    fetchUserProfile();
    // Fetch fuel quote history data from the backend when the component mounts
    fetchQuoteHistory();
  }, []);

  const fetchUserProfile = async () => {
    try {
      // Retrieve JWT token from local storage
      const token = localStorage.getItem('token');
      // Split the token into its parts
      const tokenParts = token.split('.');
      // Decode the payload (the second part)
      const payload = JSON.parse(atob(tokenParts[1]));
      // Extract information from the payload
      setUsername(payload.username);
      console.log(token);
      const response = await axios.get('http://localhost:3000/api/profile/profile', {
        headers: {
          'Authorization': `Bearer ` + localStorage.getItem('token')
        }
      });
      const profileData = response.data;
      // Update state variables with profile data
      setFullName(profileData.fullName);
      setAddress1(profileData.address1);
      setAddress2(profileData.address2);
      setCity(profileData.city);
      setState(profileData.state);
      setZipcode(profileData.zipcode);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };
  
  const fetchQuoteHistory = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/fuel-quote/fuel-quote/history', {
        headers: {
          'Authorization': `Bearer ` + localStorage.getItem('token')
        }
      });
      setQuoteHistory(response.data);
    } catch (error) {
      console.error('Error fetching quote history:', error);
    }
  };

  useEffect(() => {
    // Logic for handling recent orders
  }, []);

  const redirectToFuelQuoteForm = () => {
    window.location.href = "/userfuelrequest";
  };

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfilePicture(reader.result);
    };

    reader.readAsDataURL(image);
  };

  const handleEditProfile = () => {
    setIsEditing(!isEditing); // Toggle editing mode
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Save profile changes logic can be added here
  };

  const handleCancelEdit = () => {
    // Reset profile fields to their original values
    setIsEditing(false);
  };

  // List of 50 states
  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA',
    'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK',
    'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  const handleLogout = () => {
    window.location.href = "/homepage";
    // Handle logout logic here
    console.log("Logged out");
  };

  return (
    <div className="container max-w-3xl mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden">
      <img src={city_banner} alt="Banner" className="w-full h-48 object-cover object-center" />
      <div className="text-center mt-4">
        <label htmlFor="file" className="block cursor-pointer bg-indigo-800 text-white px-6 py-3 mt-4 rounded-lg inline-block mb-4">
          <span className="glyphicon glyphicon-camera"></span>
          <span>Change Image</span>
          <input id="file" type="file" onChange={handleImageChange} className="hidden" />
        </label>
        <div className="w-48 h-48 mx-auto overflow-hidden rounded-full border-4 border-white">
          <img src={profilePicture} className="w-full h-full object-cover object-center" alt="User Profile" />
        </div>
        <div className="text-xl font-semibold mt-2">
          {isEditing ? (
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none"
            />
          ) : (
            fullName
          )}
        </div>
        <div className="text-gray-500">{username}</div> {/* Display username here */}
        <div className="text-gray-600 mt-4">
          <div className="flex items-center ml-4">
            <span className="font-semibold mr-2">Address 1:</span>
            {isEditing ? (
              <input
                type="text"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none"
              />
            ) : (
              address1
            )}
          </div>
          <div className="flex items-center mt-2 ml-4">
            <span className="font-semibold mr-2">Address 2:</span>
            {isEditing ? (
              <input
                type="text"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none"
              />
            ) : (
              address2
            )}
          </div>
          <div className="flex items-center mt-2 ml-4">
            <span className="font-semibold mr-2">City:</span>
            {isEditing ? (
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-1/3 border border-gray-300 rounded-md py-2 px-3 focus:outline-none"
              />
            ) : (
              city
            )}
            <span className="font-semibold mx-2">State:</span>
            {isEditing ? (
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none"
              >
                {states.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            ) : (
              state
            )}
          </div>
          <div className="flex items-center mt-2 ml-4">
            <span className="font-semibold mr-2">Zipcode:</span>
            {isEditing ? (
              <input
                type="text"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                className="w-1/3 border border-gray-300 rounded-md py-2 px-3 focus:outline-none"
              />
            ) : (
              zipcode
            )}
          </div>
        </div>
        {isEditing ? (
          <div className="flex justify-center mt-4">
            <button className="bg-indigo-800 text-white px-6 py-3 rounded-lg mr-4" onClick={handleSaveProfile}>Save</button>
            <button className="bg-gray-500 text-white px-6 py-3 rounded-lg" onClick={handleCancelEdit}>Cancel</button>
          </div>
        ) : (
          <button className="bg-indigo-800 text-white px-6 py-3 mt-4 rounded-lg inline-block" onClick={handleEditProfile}>
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        )}
        <button className="bg-gray-200 text-gray-800 px-6 py-3 mt-4 rounded-lg inline-block mt-4" onClick={handleLogout}>
          Logout
        </button>
        <div className="text-xl font-semibold mt-6">Fuel Quote History</div>
        {quoteHistory.length === 0 ? (
        <p className="text-indigo-600 mt-2">
          You have no past fuel quotes. Click the button below to order now.
        </p>
      ) : (
        quoteHistory.map((quote, index) => (
          <div key={index} className="bg-white p-6 mt-4 rounded-lg shadow-md max-w-3xl">
            <div>Gallons requested: {quote.gallonsRequested}</div>
            <div>Delivery address: {quote.deliveryAddress}</div>
            <div>Delivery date: {quote.deliveryDate}</div>
            <div>Suggested price/gallon: ${quote.pricePerGallon}</div>
            <div>Total amount due: ${quote.totalAmountDue}</div>
          </div>
        ))
      )}
        <button className="bg-indigo-800 text-white px-6 py-3 mt-4 rounded-lg inline-block" onClick={redirectToFuelQuoteForm}>Request Fuel</button>
      </div>
    </div>
  );
};

export default UserProfile;
