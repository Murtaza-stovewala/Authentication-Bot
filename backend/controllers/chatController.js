import Chat from '../models/Chat.js';
import User from '../models/User.js';

export const handleMessage = async (req, res) => {
  const { message, mobile } = req.body;
  let botReply = '';
  try {
    if (/^hi{1,2}$/i.test(message.trim())) {
      botReply = 'Welcome to Demo test server, Please enter your Number for Authentication';
    } else if (/^\d{10}$/.test(message)) {
      const user = await User.findOne({ mobile: message });
      botReply = user ? 'Thanks' : 'Number not match';
    } else {
      botReply = 'Please say "Hi" to start.';
    }

    const chat = new Chat({ userMobile: mobile, message, botReply });
    await chat.save();

    res.json({ botReply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};