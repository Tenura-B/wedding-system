import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import dns from 'node:dns';

// Fix for querySrv ECONNREFUSED on Windows
dns.setServers(['8.8.8.8', '8.8.4.4']);
import Invitation from './models/Invitation.js';
import RSVP from './models/RSVP.js';
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

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Belle Vows API is running' });
});

// Invitation Routes
app.post('/api/invitations', upload.single('photo'), async (req, res) => {
  try {
    const invitationData = {
      ...req.body,
      photoUrl: req.file ? req.file.path : undefined, // Cloudinary provides the path (URL)
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
