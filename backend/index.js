import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import dns from 'node:dns';

// Fix for querySrv ECONNREFUSED on Windows
dns.setServers(['8.8.8.8', '8.8.4.4']);
import Invitation from './models/Invitation.js';
import RSVP from './models/RSVP.js';
import User from './models/User.js';
import Vendor from './models/Vendor.js';
import auth from './middleware/auth.js';
import jwt from 'jsonwebtoken';
import upload from './config/cloudinary.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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

app.use(cors());
app.use(express.json());

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
    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email }, token });
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
    res.json({ user: { id: user._id, name: user.name, email: user.email }, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
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
    const { name, status, guests, message } = req.body;
    const rsvp = new RSVP({
      invitationSlug: req.params.slug,
      name,
      status,
      guests,
      message
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
