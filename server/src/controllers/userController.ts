import express from 'express';
import Loan from '../models/Loan';
import User from '../models/User';
import type { ILoan } from '../models/Loan';
import type { Request, Response } from 'express';


export const createLoan = async (req: Request, res: Response): Promise<Response> => {
    try {
        const loanData: ILoan = req.body;

        const verifiers = await User.find({ role: 'verifier' }).select('name email');
        if (verifiers.length > 0) {
          loanData.assignedVerifier = verifiers[0]._id;
        }
        loanData.user = req.user.id;
        loanData.status = 'pending';
        const newLoan = new Loan(loanData);
        await newLoan.save();
        res.status(201).json(newLoan);
    } catch (error) {
        console.error('Error creating loan:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
  }

  export const getLoans = async (req: Request, res: Response): Promise<Response> => {
    try {

      const loans = await Loan.find({ user: req.user.id }).populate('assignedVerifier', 'name email phone');
      return res.status(200).json(loans);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to retrieve loans' });
    }
  }
