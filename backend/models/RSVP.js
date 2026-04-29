import mongoose from 'mongoose';

const rsvpSchema = new mongoose.Schema({
  invitationSlug: { type: String, required: true, index: true },
  name: { type: String, required: true },
  status: { type: String, enum: ['coming', 'declined'], default: 'coming' },
  guests: { type: Number, default: 1 },
  category: { type: String, default: 'Guest' },
  message: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('RSVP', rsvpSchema);
