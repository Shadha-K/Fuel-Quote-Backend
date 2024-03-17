// fuelQuoteController.js

// Example fuel quote data (replace with your actual data access logic)
const fuelQuoteData = [];

// Function to create a new fuel quote request
async function createQuote(req, res) {
  // Extract fuel quote data from the request body
  const { gallonsRequested, deliveryDate } = req.body;

  try {
    // Example logic to create a new fuel quote request (replace with your actual data access logic)
    // For demonstration purposes, we're just adding the fuel quote data to the array
    const newQuote = {
      gallonsRequested,
      deliveryDate,
      // Add any other necessary data
    };
    fuelQuoteData.push(newQuote);

    // Send a success response with the new fuel quote data
    return res.status(201).json(newQuote);
  } catch (error) {
    console.error('Error creating fuel quote:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Function to retrieve the fuel quote history of the currently authenticated user
async function getQuoteHistory(req, res) {
  try {
    // Example logic to retrieve fuel quote history data (replace with your actual data access logic)
    // For demonstration purposes, we're just returning the hardcoded fuel quote data
    return res.status(200).json(fuelQuoteData);
  } catch (error) {
    console.error('Error retrieving fuel quote history:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  createQuote,
  getQuoteHistory
};
