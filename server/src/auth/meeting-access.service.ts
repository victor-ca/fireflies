import { MongooseMeetingRepository } from "../meetings/repo/meeting.repository";
import { NotFoundError, UnauthorizedError } from "./errors";

export class MeetingAccessService {
  constructor(
    private readonly repository: MongooseMeetingRepository,
    private readonly userId: string
  ) {}

  getCurrentUserId(): string {
    return this.userId;
  }

  async assertUserAccess(userId: string): Promise<void> {
    if (this.userId !== userId) {
      throw new UnauthorizedError(
        "You are not authorized to access this meetings for this user"
      );
    }
  }

  async assertMeetingAccess(meetingId: string): Promise<void> {
    const meetingUserId = await this.repository.getUserIdByMeetingId(meetingId);
    if (!meetingUserId) {
      throw new NotFoundError("Meeting not found");
    }
    if (meetingUserId !== this.userId) {
      throw new UnauthorizedError(
        "You are not authorized to access this meeting"
      );
    }
  }
}
