import { MongooseMeeting } from "../meetings/repo/meeting.mongoose.js";
import { MongooseTask } from "../tasks/repo/tasks.mongoose.js";
import {
  DashboardData,
  OverdueTask,
  UpcomingMeeting,
} from "./dashboard.model.js";

const getUpcomingMeetings = async (
  userId: string,
  referenceDate: Date
): Promise<UpcomingMeeting[]> => {
  const aggregation = await MongooseMeeting.aggregate([
    { $match: { userId, date: { $gte: referenceDate } } },
    { $sort: { date: 1 } },
    { $limit: 5 },
    { $addFields: { participantCount: { $size: "$participants" } } },
    { $project: { _id: 1, title: 1, date: 1, participantCount: 1 } },
  ]);

  return aggregation.map(
    (meeting): UpcomingMeeting => ({
      id: meeting._id as string,
      title: meeting.title,
      date: meeting.date,
      participantCount: meeting.participantCount,
    })
  );
};

const getTaskSummary = async (
  userId: string
): Promise<DashboardData["taskSummary"]> => {
  const taskSummaryAggregation: {
    _id: string;
    count: number;
  }[] = await MongooseTask.aggregate([
    { $match: { userId } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  const taskSummaryRecord = taskSummaryAggregation.reduce((acc, curr) => {
    acc[curr._id.toString()] = curr.count;
    return acc;
  }, {} as Record<string, number>);

  return {
    pending: taskSummaryRecord["pending"] ?? 0,
    inProgress: taskSummaryRecord["in-progress"] ?? 0,
    completed: taskSummaryRecord["completed"] ?? 0,
  };
};

const getOverdueTasks = async (
  userId: string,
  referenceDate: Date
): Promise<OverdueTask[]> => {
  const aggregation = await MongooseTask.aggregate([
    {
      $match: {
        userId,
        dueDate: { $lt: referenceDate },
        status: { $ne: "completed" },
      },
    },
    {
      $lookup: {
        from: "meetings",
        localField: "meetingId",
        foreignField: "_id",
        as: "meeting",
      },
    },
    { $unwind: "$meeting" },
    {
      $project: {
        _id: 1,
        title: 1,
        dueDate: 1,
        meetingId: 1,
        meetingTitle: "$meeting.title",
      },
    },
  ]);

  return aggregation.map(
    (aggregate): OverdueTask => ({
      id: aggregate._id as string,
      title: aggregate.title,
      dueDate: aggregate.dueDate,
      meetingId: aggregate.meetingId,
      meetingTitle: aggregate.title,
    })
  );
};

export async function getDashboardDataByUserId(
  userId: string
): Promise<DashboardData> {
  const now = new Date();

  const totalMeetings = await MongooseMeeting.countDocuments({ userId });

  const dashboardData: DashboardData = {
    totalMeetings,
    taskSummary: await getTaskSummary(userId),
    upcomingMeetings: await getUpcomingMeetings(userId, now),
    overdueTasks: await getOverdueTasks(userId, now),
  };

  return dashboardData;
}
