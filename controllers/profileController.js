const userProfileData = {
    username: 'user_name123',
    fullName: 'John Doe',
    address1: '123 Main St',
    address2: '',
    city: 'City',
    state: 'ST',
    zipcode: '12345'
  };
  
  async function getProfile(req, res) {
    try {
      return res.status(200).json(userProfileData);
    } catch (error) {
      console.error('Error retrieving profile:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  async function updateProfile(req, res) {
    const { username, fullName, address1, address2, city, state, zipcode } = req.body;
  
    try {
      userProfileData.username = username;
      userProfileData.fullName = fullName;
      userProfileData.address1 = address1;
      userProfileData.address2 = address2;
      userProfileData.city = city;
      userProfileData.state = state;
      userProfileData.zipcode = zipcode;
  
      return res.status(200).json(userProfileData);
    } catch (error) {
      console.error('Error updating profile:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  module.exports = {
    getProfile,
    updateProfile
  };
  