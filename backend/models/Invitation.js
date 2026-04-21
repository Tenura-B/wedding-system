import mongoose from 'mongoose';

const invitationSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  brideName: { type: String, required: true },
  groomName: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String },
  venueName: { type: String, required: true },
  address: { type: String },
  message: { type: String },
  template: { type: String, default: 'classic' },
  photoUrl: { type: String }, // Cloudinary URL
  registries: [{
    name: String,
    url: String
  }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Invitation', invitationSchema);
