import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import config from '../config/config';
const createAdmin = async () => {
  const adminName = 'Admin'
  const adminEmail = 'sudeep160403@gmail.com';
  const adminPassword = 'Su@160403';
  const adminPhone = 6372432280;
  const adminAddress = 'Mumbai, India';

  try {
    await mongoose.connect(config.mongodb.url, {
    });

    const existingAdmin = await User.findOne({ email: adminEmail, role: 'admin' });
    if (existingAdmin) {
      console.log('Admin already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const newAdmin = new User({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      phone: adminPhone,
      address: adminAddress,
      role: 'admin',
    });

    await newAdmin.save();
    console.log('Admin created successfully');
  } catch (err) {
    console.error('Error creating admin:', err);
  } finally {
    mongoose.connection.close();
  }
};

createAdmin();
