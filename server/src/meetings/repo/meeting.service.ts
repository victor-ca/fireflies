import { NotFoundError, UnauthorizedError } from "../../auth/errors";
import { IMeeting, IMeetingCreateRequest } from "../meeting.model";
import { MongooseMeetingRepository } from "./meeting.repository";

export class SecureMeetingService {
  constructor(
    private readonly repository: MongooseMeetingRepository,
    private readonly userId: string
  ) {}

  async findAllForCurrentUser(): Promise<IMeeting[]> {
    return this.repository.findAll({ userId: this.userId });
  }

  async findById(meetingId: string): Promise<IMeeting | null> {
    await this.assertCurrentUserCanAccessMeeting(meetingId);
    const meeting = await this.repository.findById(meetingId);
    if (meeting && meeting.userId !== this.userId) {
      throw new UnauthorizedError(
        "You are not authorized to access this meeting"
      );
    }
    return meeting;
  }

  async updateTranscript({
    meetingId,
    transcript,
  }: {
    meetingId: string;
    transcript: string;
  }): Promise<IMeeting | null> {
    await this.assertCurrentUserCanAccessMeeting(meetingId);
    return this.repository.updateTranscript({ meetingId, transcript });
  }

  async create(meetingData: IMeetingCreateRequest): Promise<IMeeting> {
    return this.repository.create({
      ...meetingData,
      userId: this.userId,
      actionItems: [],
      transcript: "",
      summary: "",
    });
  }

  async getStats() {
    return this.repository.getStats(this.userId);
  }

  private readonly assertCurrentUserCanAccessMeeting = async (
    meetingId: string
  ) => {
    const meetingUserId = await this.repository.getUserIdByMeetingId(meetingId);
    if (!meetingUserId) {
      throw new NotFoundError("Meeting not found");
    }
    if (meetingUserId !== this.userId) {
      throw new UnauthorizedError(
        "You are not authorized to access this meeting"
      );
    }
  };
}
