import { IMeeting } from "../meetings/meeting.model";
import { ITask } from "../tasks/task";

export type UpcomingMeeting = Pick<IMeeting, "id" | "title" | "date"> & {
  participantCount: number;
};

export type OverdueTask = Pick<
  ITask,
  "id" | "title" | "dueDate" | "meetingId"
> & {
  meetingTitle: string;
};

export type DashboardData = {
  totalMeetings: number;
  taskSummary: {
    pending: number;
    inProgress: number;
    completed: number;
  };
  upcomingMeetings: UpcomingMeeting[];
  overdueTasks: OverdueTask[];
};
