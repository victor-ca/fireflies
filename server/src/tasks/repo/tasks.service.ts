import { UnauthorizedError } from "../../auth/errors";
import { ITask } from "../task";
import { TaskRepo } from "./tasks.repo";

export class SecureTaskService {
  constructor(
    private readonly repository: TaskRepo,
    private readonly userId: string
  ) {}

  async findAllForCurrentUser(): Promise<ITask[]> {
    return this.repository.findAll(this.userId);
  }

  async findAllForMeeting(meetingId: string): Promise<ITask[]> {
    const tasks = await this.repository.findAllForMeeting(meetingId);

    // Check if any of the tasks belong to the current user
    const userTasks = tasks.filter((task) => task.userId === this.userId);

    if (userTasks.length === 0) {
      throw new UnauthorizedError(
        "You are not authorized to access tasks for this meeting"
      );
    }

    return userTasks;
  }
}
