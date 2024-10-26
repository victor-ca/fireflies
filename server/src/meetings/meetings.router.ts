import express from "express";

import { AuthenticatedRequest } from "../auth/auth.middleware.js";
import { MongooseMeetingRepository } from "./repo/meeting.repository.js";
import { validate } from "../utils/validation.js";
import { body } from "express-validator";
import { IMeeting, validateMeetingCreation } from "./meeting.model.js";

export const router = express.Router();
const meetingRepository = new MongooseMeetingRepository();
// GET all meetings for user
router.get("/", async (req: AuthenticatedRequest, res) => {
  try {
    const meetings = await meetingRepository.findAll(req.userId!);
    res.json({
      total: meetings.length,
      limit: req.query.limit,
      page: req.query.page,
      data: meetings,
    });
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
});

// POST a new meeting
router.post(
  "/",
  validateMeetingCreation,
  async (req: AuthenticatedRequest, res) => {
    try {
      const newMeeting = await meetingRepository.create({
        ...req.body,
        userId: req.userId!,
      });
      res.status(201).json(newMeeting);
    } catch (err) {
      res.status(400).json({ message: (err as Error).message });
    }
  }
);

router.get("/stats", async (req: AuthenticatedRequest, res) => {
  return meetingRepository.getStats(req.userId!);
});

export { router as meetingRoutes };
