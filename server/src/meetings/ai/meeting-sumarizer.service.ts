import { MongooseMeetingRepository } from "../repo/meeting.repository";
import { MongooseTaskRepository } from "../../tasks/repo/tasks.repo";
import { MockMeetingAiService } from "./meeting-ai.service";

import { ITask } from "../../tasks/task";

export class MeetingSummarizerService {
  constructor(
    private readonly meetingRepository: MongooseMeetingRepository,
    private readonly taskRepository: MongooseTaskRepository,
    private readonly aiService: MockMeetingAiService
  ) {}

  async summarizeMeeting(meetingId: string): Promise<{
    summary: string;
    actionItems: ITask[];
  }> {
    const meeting = await this.meetingRepository.findById(meetingId);
    if (!meeting) {
      throw new Error("Meeting not found");
    }

    const [summary, actionItems] = await Promise.all([
      this.aiService.generateSummary(meeting),
      this.aiService.generateActionItems(meeting),
    ]);

    await this.meetingRepository.update(meetingId, { summary });

    const tasks: ITask[] = [];
    const nextMonth = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    for (const item of actionItems) {
      const task: Omit<ITask, "id"> = {
        meetingId,
        userId: meeting.userId,
        title: item,
        description: `Task from AI: ${item}`,
        status: "pending",
        dueDate: nextMonth,
      };
      const createdTask = await this.taskRepository.create(task);
      tasks.push(createdTask);
    }

    return { summary, actionItems: tasks };
  }
}
