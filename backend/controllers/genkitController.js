const { generateResponse } = require('../services/genkitService');

const handlePrompt = async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await generateResponse(prompt);
    res.json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = { handlePrompt };