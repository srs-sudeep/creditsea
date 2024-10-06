import mongoose from 'mongoose';
import config from '../config/config';
const connectDB = async (): Promise<void> => {
  try {
    const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
    await mongoose.connect(config.mongodb.url, clientOptions);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
