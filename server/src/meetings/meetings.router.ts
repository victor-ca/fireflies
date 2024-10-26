import express from "express";

import { AuthenticatedRequest } from "../auth/auth.middleware.js";

import { validateMeetingCreation } from "./meeting.model.js";
import { useSecureMeetingService } from "../service.setup.js";

export const router = express.Router();

router.get("/", async (req: AuthenticatedRequest, res) => {
  const meetings = await useSecureMeetingService(req.userId).findByUserId(
    req.userId!
  );

  res.json({
    total: meetings.length,
    limit: req.query.limit,
    page: req.query.page,
    data: meetings,
  });
});

router.get("/:id", async (req: AuthenticatedRequest, res) => {
  const meeting = await useSecureMeetingService(req.userId).findById(
    req.params.id
  );
  if (!meeting) {
    res.status(404).json({ message: "Meeting not found" });
    return;
  }
  res.json(meeting);
});

router.put("/:id/transcript", async (req: AuthenticatedRequest, res) => {
  try {
    const { transcript } = req.body;
    if (!transcript || typeof transcript !== "string") {
      res.status(400).json({ message: "Invalid transcript data" });
      return;
    }

    const meetingService = useSecureMeetingService(req.userId);
    const updatedMeeting = await meetingService.updateTranscript({
      meetingId: req.params.id,
      transcript,
    });

    res.json(updatedMeeting);
  } catch (error) {
    console.error("Error updating transcript:", error);
    res.status(500).json({ message: "Internal server error" });
  }
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
