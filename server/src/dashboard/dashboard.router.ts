import express from "express";

import { AuthenticatedRequest } from "../auth/auth.middleware.js";

import { getDashboardDataByUserId } from "./dashboard.service.js";

const router = express.Router();

router.get("/", async (req: AuthenticatedRequest, res) => {
  const userId = req.userId!;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const dashboardData = await getDashboardDataByUserId(userId);
  res.json(dashboardData);
});

export { router as dashboardRoutes };

// // TODO: fix this
//   // it should be sorted by date, only include upcoming meetings, limit to 5 and only include the _id, title, date, and participantCount fields
//   const upcomingMeetings = (await MongooseMeeting.find()).map((meeting) => {
//     return {
//       _id: meeting._id as mongoose.Types.ObjectId,
//       title: meeting.title,
//       date: meeting.date,
//       participantCount: meeting.participants.length,
//     };
//   });

//   const dashboardData: DashboardData = {
//     totalMeetings: (await MongooseMeeting.find()).length,
//     taskSummary: {
//       pending: 10,
//       inProgress: 5,
//       completed: 2,
//     },
//     upcomingMeetings,
//     // TODO: need to lookup meeting title from meeting collection
//     overdueTasks: [
//       {
//         _id: new mongoose.Types.ObjectId(),
//         title: "Task 1",
//         dueDate: new Date(),
//         meetingId: new mongoose.Types.ObjectId(),
//         meetingTitle: "Meeting 1",
//       },
//       {
//         _id: new mongoose.Types.ObjectId(),
//         title: "Task 2",
//         dueDate: new Date(),
//         meetingId: new mongoose.Types.ObjectId(),
//         meetingTitle: "Meeting 2",
//       },
//     ],
//   };
