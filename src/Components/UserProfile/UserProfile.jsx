import React, { useEffect, useState } from 'react';
import placeholder_icon from '../Assets/Portrait_Placeholder.png';
import city_banner from '../Assets/citybanner2.jpg';
import axios from 'axios';

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
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

  const [fullNameError, setFullNameError] = useState('');
  const [address1Error, setAddress1Error] = useState('');
  const [address2Error, setAddress2Error] = useState('');
  const [cityError, setCityError] = useState('');
  const [zipcodeError, setZipcodeError] = useState('');

  useEffect(() => {
    fetchUserProfile();
    fetchQuoteHistory();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const tokenParts = token.split('.');
      const payload = JSON.parse(atob(tokenParts[1]));
      setUsername(payload.username);
      console.log(token);
      const response = await axios.get('http://localhost:3000/api/profile/profile', {
        headers: {
          'Authorization': `Bearer ` + localStorage.getItem('token')
        }
      });
      const profileData = response.data;
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
    setIsEditing(!isEditing); 
  };

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

  const handleSaveProfile = async () => {
    if (fullNameError || address1Error || address2Error || cityError || zipcodeError) {
      console.log('Cannot save profile due to errors');
      return; 
    }
  
    try {
      const updatedProfileData = {
        fullName,
        address1,
        address2,
        city,
        state,
        zipcode
      };
  
      const response = await axios.put('http://localhost:3000/api/profile/profile', updatedProfileData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      console.log('Profile updated successfully:', response.data);
  
      // If the profile update is successful, exit edit mode
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA',
    'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK',
    'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = "/homepage";
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
              onChange={handleFullNameChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none"
            />
          ) : (
            fullName
          )}
          {isEditing && fullNameError && <div className="text-red-500">{fullNameError}</div>}
        </div>
        <div className="text-gray-500">{username}</div> 
        <div className="text-gray-600 mt-4">
          <div className="flex items-center ml-4">
            <span className="font-semibold mr-2">Address 1:</span>
            {isEditing ? (
              <input
                type="text"
                value={address1}
                onChange={handleAddress1Change}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none"
              />
            ) : (
              address1
            )}
            {isEditing && address1Error && <div className="text-red-500">{address1Error}</div>}
          </div>
          <div className="flex items-center mt-2 ml-4">
            <span className="font-semibold mr-2">Address 2:</span>
            {isEditing ? (
              <input
                type="text"
                value={address2}
                onChange={handleAddress2Change}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none"
              />
            ) : (
              address2
            )}
            {isEditing && address2Error && <div className="text-red-500">{address2Error}</div>}
          </div>
          <div className="flex items-center mt-2 ml-4">
            <span className="font-semibold mr-2">City:</span>
            {isEditing ? (
              <input
                type="text"
                value={city}
                onChange={handleCityChange}
                className="w-1/3 border border-gray-300 rounded-md py-2 px-3 focus:outline-none"
              />
            ) : (
              city
            )}
            {isEditing && cityError && <div className="text-red-500">{cityError}</div>}
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
                onChange={handleZipcodeChange}
                className="w-1/3 border border-gray-300 rounded-md py-2 px-3 focus:outline-none"
              />
            ) : (
              zipcode
            )}
            {isEditing && zipcodeError && <div className="text-red-500">{zipcodeError}</div>}
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
