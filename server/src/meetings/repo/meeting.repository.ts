import { Meeting } from "./meeting.mongoose";
import {
  IMeeting,
  IMeetingCreateRequest,
  IMeetingWithId,
} from "../meeting.model";

export class MongooseMeetingRepository {
  async findAll(userId: string): Promise<IMeeting[]> {
    const result = await Meeting.find({ userId })
      .select({
        userId: 1,
        title: 1,
        date: 1,
        participants: 1,
        _id: 1,
      })

      .lean();
    return result.map(this.toMeeting);
  }

  async findById(id: string): Promise<IMeeting | null> {
    return Meeting.findById(id);
  }

  async create(meeting: IMeeting): Promise<IMeeting> {
    const newMeeting = new Meeting(meeting);
    return newMeeting.save();
  }

  async update(
    id: string,
    meeting: Partial<IMeeting>
  ): Promise<IMeeting | null> {
    return Meeting.findByIdAndUpdate(id, meeting, { new: true });
  }

  async delete(id: string): Promise<IMeeting | null> {
    return Meeting.findByIdAndDelete(id);
  }

  async getStats(_userId: string): Promise<any> {
    return {
      generalStats: {
        totalMeetings: 100,
        averageParticipants: 4.75,
        totalParticipants: 475,
        shortestMeeting: 15,
        longestMeeting: 120,
        averageDuration: 45.3,
      },
      topParticipants: [
        { participant: "John Doe", meetingCount: 20 },
        { participant: "Jane Smith", meetingCount: 18 },
        { participant: "Bob Johnson", meetingCount: 15 },
        { participant: "Alice Brown", meetingCount: 12 },
        { participant: "Charlie Davis", meetingCount: 10 },
      ],
      meetingsByDayOfWeek: [
        { dayOfWeek: 1, count: 10 },
        { dayOfWeek: 2, count: 22 },
        { dayOfWeek: 3, count: 25 },
        { dayOfWeek: 4, count: 20 },
        { dayOfWeek: 5, count: 18 },
        { dayOfWeek: 6, count: 5 },
        { dayOfWeek: 7, count: 0 },
      ],
    };
  }

  private readonly toMeeting = (
    meeting: IMeeting & { _id: unknown }
  ): IMeetingWithId => {
    return {
      // we should trim extra props here.
      ...meeting,
      id: meeting._id as string,
    };
  };
}
