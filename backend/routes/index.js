const express = require('express');
const router = express.Router();
const { handlePrompt } = require('../controllers/genkitController');

router.post('/genkit', handlePrompt);

module.exports = router;