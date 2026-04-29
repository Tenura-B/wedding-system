import express from 'express';
import auth from '../middleware/auth.js';
import { getAIResponse } from '../services/aiService.js';
import Budget from '../models/Budget.js';
import Task from '../models/Task.js';
import RSVP from '../models/RSVP.js';
import Invitation from '../models/Invitation.js';

const router = express.Router();

router.post('/chat', auth, async (req, res) => {
  try {
    const { message, invitationId } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Fetch context data if invitationId is provided
    let contextData = {};
    if (invitationId) {
      const [budget, tasks, invitation] = await Promise.all([
        Budget.findOne({ invitationId }),
        Task.find({ invitationId }),
        Invitation.findById(invitationId)
      ]);

      const rsvps = invitation ? await RSVP.find({ invitationSlug: invitation.slug }) : [];

      contextData = {
        weddingDetails: invitation,
        budget: budget,
        tasks: tasks,
        guestStats: {
          totalResponses: rsvps.length,
          attending: rsvps.filter(r => r.status === 'coming').reduce((acc, r) => acc + r.guests, 0),
          declined: rsvps.filter(r => r.status === 'declined').length
        }
      };
    }

    const aiResponse = await getAIResponse(message, contextData);
    res.json({ response: aiResponse });
  } catch (error) {
    console.error("Chat Error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
