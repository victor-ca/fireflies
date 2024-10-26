import express from "express";

import { AuthenticatedRequest } from "../auth/auth.middleware.js";
import { MongooseMeetingRepository } from "./repo/meeting.repository.js";

import { validateMeetingCreation } from "./meeting.model.js";
import { useSecureMeetingService } from "./repo/service-builder.js";

export const router = express.Router();
const meetingRepository = new MongooseMeetingRepository();

router.get("/", async (req: AuthenticatedRequest, res) => {
  const meetings = await useSecureMeetingService(
    req.userId
  ).findAllForCurrentUser();

  res.json({
    total: meetings.length,
    limit: req.query.limit,
    page: req.query.page,
    data: meetings,
  });
});

router.post(
  "/",
  validateMeetingCreation,
  async (req: AuthenticatedRequest, res) => {
    const newMeeting = await useSecureMeetingService(req.userId).create(
      req.body
    );
    res.status(201).json(newMeeting);
  }
);

router.get("/stats", async (req: AuthenticatedRequest, res) => {
  const stats = await useSecureMeetingService(req.userId).getStats();
  res.json(stats);
});

export { router as meetingRoutes };
