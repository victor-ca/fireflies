import { MeetingAccessService } from "../../auth/meeting-access.service.js";
import { ITask } from "../task.js";
import { MongooseTaskRepository } from "./tasks.repo.js";

export class SecureTaskService {
  constructor(
    private readonly repository: MongooseTaskRepository,
    private readonly accessService: MeetingAccessService
  ) {}

  async findByUserId(userId: string): Promise<ITask[]> {
    await this.accessService.assertUserAccess(userId);
    return this.repository.findAllByUserId(userId);
  }

  async findAllForMeeting({
    meetingId,
    userId,
  }: {
    meetingId: string;
    userId: string;
  }): Promise<ITask[]> {
    await this.accessService.assertMeetingAccess(meetingId);
    const tasks = await this.repository.findAllForMeeting({
      meetingId,
      userId,
    });

    return tasks;
  }
}
