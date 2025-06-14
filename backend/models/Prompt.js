const mongoose = require('mongoose');

const PromptSchema = new mongoose.Schema({
  promptText: { type: String, required: true },
  responseText: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prompt', PromptSchema);