import { MongooseMeeting } from "../meetings/repo/meeting.mongoose.js";
import { IMeeting } from "../meetings/meeting.model.js";
import { ITask } from "../tasks/task.js";

type UpcomingMeeting = Pick<IMeeting, "id" | "title" | "date"> & {
  participantCount: number;
};

type OverdueTask = Pick<ITask, "id" | "title" | "dueDate" | "meetingId"> & {
  meetingTitle: string;
};

type DashboardData = {
  totalMeetings: number;
  taskSummary: {
    pending: number;
    inProgress: number;
    completed: number;
  };
  upcomingMeetings: UpcomingMeeting[];
  overdueTasks: OverdueTask[];
};

export async function getDashboardDataByUserId(
  userId: string
): Promise<DashboardData> {
  const now = new Date();

  const upcomingMeetings = await MongooseMeeting.aggregate([
    { $match: { userId, date: { $gte: now } } },
    { $sort: { date: 1 } },
    { $limit: 5 },
    { $addFields: { participantCount: { $size: "$participants" } } },
    { $project: { _id: 1, title: 1, date: 1, participantCount: 1 } },
  ]);

  const totalMeetings = await MongooseMeeting.countDocuments({ userId });

  const dashboardData: DashboardData = {
    totalMeetings,
    taskSummary: {
      pending: 0,
      inProgress: 0,
      completed: 0,
    },
    upcomingMeetings: upcomingMeetings.map((meeting) => ({
      id: meeting._id as string,
      title: meeting.title,
      date: meeting.date,
      participantCount: meeting.participantCount,
    })),
    overdueTasks: [],
  };

  return dashboardData;
}
