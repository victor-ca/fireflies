import { ITask } from "../task";
import { IMongooseTask, MongooseTask } from "./tasks.mongoose";
import mongoose from "mongoose";

export class MongooseTaskRepository {
  async findAllByUserId(userId: string): Promise<ITask[]> {
    const tasks = await MongooseTask.find({ userId });
    return tasks.map(this.convertToITask);
  }

  async findAllForMeeting({
    meetingId,
    userId,
  }: {
    meetingId: string;
    userId: string;
  }): Promise<ITask[]> {
    const tasks: IMongooseTask[] = await MongooseTask.find({
      meetingId: new mongoose.Types.ObjectId(meetingId),
      userId,
    });

    return tasks.map((task) => this.convertToITask(task));
  }

  private convertToITask(task: IMongooseTask): ITask {
    return {
      id: task._id as string,
      meetingId: task.meetingId.toString(),
      userId: task.userId,
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: task.dueDate,
    };
  }
}
