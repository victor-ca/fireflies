import { MongooseMeeting } from "./meeting.mongoose";
import { IMeeting, IMeetingWithId } from "../meeting.model";

export class MongooseMeetingRepository {
  async findAll({ userId }: { userId: string }): Promise<IMeeting[]> {
    const result = await MongooseMeeting.find({ userId })
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

  async getUserIdByMeetingId(meetingId: string): Promise<string | null> {
    const result = await MongooseMeeting.findById(meetingId).select({
      userId: 1,
    });
    return result?.userId ?? null;
  }

  async updateTranscript({
    meetingId,
    transcript,
  }: {
    meetingId: string;
    transcript: string;
  }): Promise<IMeeting | null> {
    return MongooseMeeting.findByIdAndUpdate(
      meetingId,
      { transcript },
      { new: true }
    );
  }

  async findById(id: string): Promise<IMeeting | null> {
    const result = await MongooseMeeting.findById(id).lean();
    return result ? this.toMeeting(result) : null;
  }

  async create(meeting: Omit<IMeeting, "id">): Promise<IMeeting> {
    const newMeeting = new MongooseMeeting(meeting);
    return newMeeting.save();
  }

  async update(
    id: string,
    meeting: Partial<IMeeting>
  ): Promise<IMeeting | null> {
    return MongooseMeeting.findByIdAndUpdate(id, meeting, { new: true });
  }

  async delete(id: string): Promise<IMeeting | null> {
    return MongooseMeeting.findByIdAndDelete(id);
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
