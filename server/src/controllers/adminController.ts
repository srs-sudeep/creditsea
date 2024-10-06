import type { Request, Response } from 'express';
import User from '../models/User';
export const getVerifiers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const verifiers = await User.find({role: 'verifier'});
    return res.status(200).json(verifiers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve verifiers' });
  }
}
