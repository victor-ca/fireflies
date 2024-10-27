import { MeetingAccessService } from "../../auth/meeting-access.service.js";
import { MongooseTaskRepository } from "../../tasks/repo/tasks.repo.js";
import { ITask } from "../../tasks/task.js";
import { IMeeting, IMeetingCreateRequest } from "../meeting.model.js";
import { MongooseMeetingRepository } from "../repo/meeting.repository.js";

export class SecureMeetingService {
  constructor(
    private readonly meetingRepository: MongooseMeetingRepository,
    private readonly taskRepository: MongooseTaskRepository,
    private readonly accessService: MeetingAccessService
  ) {}

  async findByUserId(userId: string): Promise<IMeeting[]> {
    await this.accessService.assertUserAccess(userId);
    return this.meetingRepository.findAll({ userId });
  }

  async findByMeetingId(meetingId: string): Promise<
    | (IMeeting & {
        tasks: ITask[];
      })
    | null
  > {
    await this.accessService.assertMeetingAccess(meetingId);
    const meeting = await this.meetingRepository.findById(meetingId);
    if (!meeting) {
      return null;
    }

    const tasks = await this.taskRepository.findAllForMeeting({
      meetingId,
      userId: this.accessService.getCurrentUserId(),
    });

    return { ...meeting, tasks };
  }

  async updateTranscript({
    meetingId,
    transcript,
  }: {
    meetingId: string;
    transcript: string;
  }): Promise<IMeeting | null> {
    await this.accessService.assertMeetingAccess(meetingId);
    return this.meetingRepository.updateTranscript({ meetingId, transcript });
  }

  async create(meetingData: IMeetingCreateRequest): Promise<IMeeting> {
    return this.meetingRepository.create({
      ...meetingData,
      userId: this.accessService.getCurrentUserId(),
      actionItems: [],
      transcript: "",
      summary: "",
    });
  }
}
