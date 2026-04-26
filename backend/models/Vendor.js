import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, enum: ['Awaiting', 'Quote Sent', 'Booked'], default: 'Awaiting' },
  invitation: { type: mongoose.Schema.Types.ObjectId, ref: 'Invitation', required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Vendor', vendorSchema);
