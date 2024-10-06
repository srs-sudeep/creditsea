import mongoose, { Document, Schema } from 'mongoose';

export interface ILoan extends Document {
  user: string;
  fullName: string;
  amount: number;
  tenure: number;
  employmentStatus: 'unemployed' | 'employed';
  reason: string;
  employmentAddress1: string;
  employmentAddress2?: string;
  termsAccepted: boolean;
  creditInfoDisclosure: boolean;
  assignedVerifier: string;
  status: 'pending' | 'approved' | 'verified' | 'rejected';
}

const LoanSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User'},
  fullName: { type: String, required: true },
  amount: { type: Number, required: true },
  tenure: { type: Number, required: true },
  employmentStatus: {
    type: String,
    enum: ['unemployed', 'employed'],
    required: true
  },
  reason: { type: String, required: true },
  employmentAddress1: { type: String, required: true },
  employmentAddress2: { type: String, optional: true },
  termsAccepted: { type: Boolean, required: true },
  creditInfoDisclosure: { type: Boolean, required: true },
  assignedVerifier: { type: Schema.Types.ObjectId, ref: 'User'},
  status: { type: String,  enum: ['pending', 'approved' , 'verified','rejected'],required: true,default: 'pending' },
}, { timestamps: true });

const Loan = mongoose.model<ILoan>('Loan', LoanSchema);

export default Loan;
