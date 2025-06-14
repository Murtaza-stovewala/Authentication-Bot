import User from '../models/User.js';

export const registerUser = async (req, res) => {
  const { name, mobile } = req.body;
  try {
    const user = new User({ name, mobile });
    await user.save();
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};