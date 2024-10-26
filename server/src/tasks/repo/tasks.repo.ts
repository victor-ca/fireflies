import { ITask } from "../task";
import { IMongooseTask, MongooseTask } from "./tasks.mongoose";
import mongoose from "mongoose";

export class TaskRepo {
  async findAll(userId: string): Promise<ITask[]> {
    const tasks = await MongooseTask.find({ userId });
    return tasks.map(this.convertToITask);
  }

  async findAllForMeeting(meetingId: string): Promise<ITask[]> {
    const tasks: IMongooseTask[] = await MongooseTask.find({
      meetingId: new mongoose.Types.ObjectId(meetingId),
    });

    return tasks.map((task) => this.convertToITask(task));
  }

  private convertToITask(task: IMongooseTask): ITask {
    return {
      meetingId: task.meetingId.toString(),
      userId: task.userId,
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: task.dueDate,
    };
  }
}
