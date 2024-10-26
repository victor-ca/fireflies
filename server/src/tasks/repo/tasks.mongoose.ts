import mongoose, { Schema, Document } from "mongoose";
import { ITask } from "../task";

export type IMongooseTask = Omit<ITask, "meetingId" | "id"> & {
  meetingId: mongoose.Types.ObjectId;
} & Document;

const taskSchema = new Schema<IMongooseTask>({
  meetingId: { type: Schema.Types.ObjectId, ref: "Meeting" },
  userId: String,
  title: String,
  description: String,
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
  dueDate: Date,
});

export const MongooseTask = mongoose.model<IMongooseTask>("Task", taskSchema);
