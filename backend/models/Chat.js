import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  userMobile: { type: String, required: true },
  message: { type: String, required: true },
  botReply: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Chat', chatSchema);