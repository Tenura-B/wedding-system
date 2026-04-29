import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['Paid', 'Pending'], default: 'Pending' },
  date: { type: Date, default: Date.now }
});

const budgetSchema = new mongoose.Schema({
  invitationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Invitation', required: true, unique: true },
  totalBudget: { type: Number, default: 0 },
  expenses: [expenseSchema],
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Budget', budgetSchema);
