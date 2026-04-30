import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import dns from 'node:dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);
dotenv.config();

const email = process.argv[2];

if (!email) {
  console.error('Please provide an email: node promote.js user@example.com');
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    const user = await User.findOneAndUpdate({ email }, { role: 'superadmin' }, { new: true });
    if (user) {
      console.log(`Success: ${email} is now a ${user.role}`);
    } else {
      console.log(`User ${email} not found`);
    }
    process.exit(0);
  })
  .catch(err => {
    console.error('Connection error:', err);
    process.exit(1);
  });
