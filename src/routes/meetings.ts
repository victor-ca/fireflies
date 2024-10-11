import express from 'express';
import { Meeting } from '../models/meeting.js';
import { AuthenticatedRequest } from '../auth.middleware.js';

export const router = express.Router();

// GET all meetings
router.get('/', async (req: AuthenticatedRequest, res) => {
  try {
    const meetings = await Meeting.find();
    res.json(meetings);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
});

// TODO: implement other endpoints

export { router as meetingRoutes };
