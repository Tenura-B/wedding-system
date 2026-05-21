import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import dns from 'node:dns';
import { OAuth2Client } from 'google-auth-library';

// Fix for querySrv ECONNREFUSED on Windows
dns.setServers(['8.8.8.8', '8.8.4.4']);
import Invitation from './models/Invitation.js';
import RSVP from './models/RSVP.js';
import User from './models/User.js';
import Vendor from './models/Vendor.js';
import Task from './models/Task.js';
import Budget from './models/Budget.js';
import auth from './middleware/auth.js';
import adminAuth from './middleware/adminAuth.js';
import jwt from 'jsonwebtoken';
import upload from './config/cloudinary.js';
import aiRouter from './routes/ai.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',').map((origin) => origin.trim()).filter(Boolean)
  : true;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => {
    console.error('MongoDB connection error:');
    console.error('- Message:', err.message);
    if (err.code) console.error('- Code:', err.code);
    if (err.reason) console.error('- Reason:', err.reason);
    console.error('\nTIP: Ensure your IP is whitelisted in MongoDB Atlas and the password in .env is correct.');
  });

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

// Log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Belle Vows API is running' });
});

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid login credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Google OAuth Route
app.post('/api/auth/google', async (req, res) => {
  try {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ error: 'Google credential is required' });
    }

    // Verify the ID token with Google
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // Find existing user by googleId, or by email (to link accounts)
    let user = await User.findOne({ $or: [{ googleId }, { email }] });

    if (user) {
      // Link Google account if signing in with same email for the first time via Google
      if (!user.googleId) {
        user.googleId = googleId;
        user.avatar = picture;
        await user.save();
      }
    } else {
      // Create a brand new Google user (no password)
      user = new User({ name, email, googleId, avatar: picture });
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({
      user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar, role: user.role },
      token
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(401).json({ error: 'Invalid Google credential' });
  }
});

// User Dashboard Route
app.get('/api/user/dashboard', auth, async (req, res) => {
  try {
    const invitations = await Invitation.find({ owner: req.user._id }).sort({ createdAt: -1 });

    // Enrich invitations with RSVP counts
    const enrichedInvitations = await Promise.all(invitations.map(async (inv) => {
      const rsvps = await RSVP.find({ invitationSlug: inv.slug });
      const vendors = await Vendor.find({ invitation: inv._id });
      return {
        ...inv.toObject(),
        stats: {
          total: rsvps.reduce((acc, curr) => acc + (curr.status === 'coming' ? curr.guests : 0), 0),
          responses: rsvps.length,
          attending: rsvps.filter(r => r.status === 'coming').length,
          declined: rsvps.filter(r => r.status === 'declined').length,
          vendorsBooked: vendors.filter(v => v.status === 'Booked').length,
          totalVendors: vendors.length
        },
        vendors
      };
    }));

    res.json(enrichedInvitations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Invitation Routes
app.post('/api/invitations', auth, upload.single('photo'), async (req, res) => {
  try {
    const invitationData = {
      ...req.body,
      owner: req.user._id,
      photoUrl: req.file ? req.file.path : undefined,
      registries: req.body.registries ? JSON.parse(req.body.registries) : []
    };

    // For local testing without Cloudinary keys, if you send a base64 or placeholder
    if (!invitationData.photoUrl && req.body.photo) {
      invitationData.photoUrl = req.body.photo;
    }

    const invitation = new Invitation(invitationData);
    await invitation.save();
    res.status(201).json(invitation);
  } catch (error) {
    console.error('Error creating invitation:', error);
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/invitations/:slug', async (req, res) => {
  try {
    const invitation = await Invitation.findOne({ slug: req.params.slug });
    if (!invitation) return res.status(404).json({ error: 'Invitation not found' });
    res.json(invitation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// RSVP Routes
app.post('/api/invitations/:slug/rsvp', async (req, res) => {
  try {
    const { name, status, guests, message, category } = req.body;
    const rsvp = new RSVP({
      invitationSlug: req.params.slug,
      name,
      status,
      guests,
      message,
      category
    });
    await rsvp.save();
    res.status(201).json(rsvp);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/invitations/:slug/rsvps', async (req, res) => {
  try {
    const rsvps = await RSVP.find({ invitationSlug: req.params.slug }).sort({ createdAt: -1 });
    res.json(rsvps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Vendor Routes
app.get('/api/invitations/:id/vendors', auth, async (req, res) => {
  try {
    const vendors = await Vendor.find({ invitation: req.params.id });
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/invitations/:id/vendors', auth, async (req, res) => {
  try {
    const vendor = new Vendor({ ...req.body, invitation: req.params.id });
    await vendor.save();
    res.status(201).json(vendor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Task Routes
app.get('/api/invitations/:id/tasks', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ invitationId: req.params.id }).sort({ createdAt: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/invitations/:id/tasks', auth, async (req, res) => {
  try {
    const task = new Task({ ...req.body, invitationId: req.params.id, owner: req.user._id });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.patch('/api/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Budget Routes
app.get('/api/invitations/:id/budget', auth, async (req, res) => {
  try {
    let budget = await Budget.findOne({ invitationId: req.params.id });
    if (!budget) {
      budget = new Budget({ invitationId: req.params.id, totalBudget: 0, expenses: [] });
      await budget.save();
    }
    res.json(budget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/invitations/:id/budget', auth, async (req, res) => {
  try {
    const { totalBudget, expenses } = req.body;
    const budget = await Budget.findOneAndUpdate(
      { invitationId: req.params.id },
      { totalBudget, expenses, updatedAt: Date.now() },
      { new: true, upsert: true }
    );
    res.json(budget);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Admin Routes
app.get('/api/admin/users', auth, adminAuth, async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/admin/users/:id', auth, adminAuth, async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.patch('/api/admin/users/:id/reset-password', auth, adminAuth, async (req, res) => {
  try {
    const { password } = req.body;
    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.password = password; // The pre-save hook in User model will handle hashing
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/admin/users/:id', auth, adminAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Also delete their invitations
    await Invitation.deleteMany({ owner: req.params.id });

    res.json({ message: 'User and their data deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/stats', auth, adminAuth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalInvitations = await Invitation.countDocuments();
    const totalRSVPs = await RSVP.countDocuments();

    // Get recent registrations
    const recentUsers = await User.find({}).sort({ createdAt: -1 }).limit(5);

    res.json({
      totalUsers,
      totalInvitations,
      totalRSVPs,
      recentUsers
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use('/api/ai', aiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
