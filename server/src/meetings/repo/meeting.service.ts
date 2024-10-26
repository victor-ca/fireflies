import { UnauthorizedError } from "../../auth/unauthorized";
import { IMeeting, IMeetingCreateRequest } from "../meeting.model";
import { MongooseMeetingRepository } from "./meeting.repository";

export class SecureMeetingService {
  constructor(
    private readonly repository: MongooseMeetingRepository,
    private readonly userId: string
  ) {}

  async findAllForCurrentUser(): Promise<IMeeting[]> {
    return this.repository.findAll(this.userId);
  }

  async findById(id: string): Promise<IMeeting | null> {
    const meeting = await this.repository.findById(id);
    if (meeting && meeting.userId !== this.userId) {
      throw new UnauthorizedError(
        "You are not authorized to access this meeting"
      );
    }
    return meeting;
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
}
