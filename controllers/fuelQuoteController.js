const fuelQuoteData = [
  {
    gallonsRequested: 50,
    deliveryAddress: '123 Main St City, ST 12345',
    deliveryDate: '3/18/2034',
    pricePerGallon: 2.13,
    totalAmountDue: 106.5
  }
];

async function createQuote(req, res) {
  const { gallonsRequested, deliveryDate } = req.body;

  try {
    const newQuote = {
      gallonsRequested,
      deliveryDate,
    };
    fuelQuoteData.push(newQuote);

    return res.status(201).json(newQuote);
  } catch (error) {
    console.error('Error creating fuel quote:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getQuoteHistory(req, res) {
  try {
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
