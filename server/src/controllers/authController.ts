// controllers/authController.ts
import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import config from '../config/config';

const JWT_SECRET = config.jsonWebTokenSecret;

export const registerUser = async (req: Request, res: Response) => {
  const { email, password,name, phone, address } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      name,
      phone,
      address, password: hashedPassword, role: 'user' });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error in registration', error: err.message });
  }
};

// Admin registering Verifier
export const registerVerifier = async (req: Request, res: Response): Promise<Response> => {
  const { email, password, name, phone, address } = req.body;
  const { role } = req.user;

  if (role !== 'admin') {
    return res.status(403).json({ message: 'Only admin can register verifiers' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const verifier = new User({
      email,
      name,
      phone,
      address,
      password: hashedPassword,
      role: 'verifier',
    });
    await verifier.save();
    return res.status(201).json({ message: 'Verifier registered successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Error in registration', error: err.message });
  }
};

// Login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};
