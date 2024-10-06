import type { Request, Response } from 'express';
import User from '../models/User';
import Loan from '../models/Loan';
export const getVerifiers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const verifiers = await User.find({role: 'verifier'});
    console.log(verifiers)
    return res.status(200).json(verifiers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve verifiers' });
  }
}
export const getLoans = async (req: Request, res: Response): Promise<Response> => {
  try {

    const loans = await Loan.find().populate('assignedVerifier', 'name email phone');
    return res.status(200).json(loans);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to retrieve loans' });
  }
}
export const getUsers = async (req: Request, res: Response): Promise<Response> => {
  try {

    const users = await User.find({role:'user'})
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to retrieve users' });
  }
}
