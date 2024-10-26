import mongoose, { Schema } from "mongoose";
import { IMeeting } from "../meeting.model";

type MeetingDocument = IMeeting & mongoose.Document;
const meetingSchema = new Schema<MeetingDocument>({
  userId: String,
  title: String,
  date: Date,
  participants: [String],
  transcript: String,
  summary: String,
  actionItems: [String],
});

export const Meeting = mongoose.model<MeetingDocument>(
  "Meeting",
  meetingSchema
);
