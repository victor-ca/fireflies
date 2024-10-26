import express from "express";

import { AuthenticatedRequest } from "../auth/auth.middleware.js";
import { MongooseMeetingRepository } from "./repo/meeting.repository.js";

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

// TODO: implement other endpoints

router.get("/stats", async (req: AuthenticatedRequest, res) => {
  return meetingRepository.getStats(req.userId!);
});

export { router as meetingRoutes };
