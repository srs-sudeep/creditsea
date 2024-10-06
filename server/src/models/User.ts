import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
  phone: string;
  address: string;
  password: string;
  role: 'user' | 'verifier' | 'admin';
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'verifier', 'admin'], default: 'user' },
});

export default mongoose.model<IUser>('User', UserSchema);
