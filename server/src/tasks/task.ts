export interface ITask {
  meetingId: string;
  userId: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  dueDate: Date;
}
