import { jest } from "@jest/globals";
import { SecureMeetingService } from "../meetings/services/meeting.service";
import { MongooseMeetingRepository } from "../meetings/repo/meeting.repository";
import { MongooseTaskRepository } from "../tasks/repo/tasks.repo";
import { MeetingAccessService } from "../auth/meeting-access.service";

import { IMeeting } from "../meetings/meeting.model";
import { ITask } from "../tasks/task";

describe("SecureMeetingService", () => {
  let secureMeetingService: SecureMeetingService;
  let mockMeetingRepository: jest.Mocked<MongooseMeetingRepository>;
  let mockTaskRepository: jest.Mocked<MongooseTaskRepository>;
  let mockAccessService: jest.Mocked<MeetingAccessService>;

  beforeEach(() => {
    mockMeetingRepository = {
      findById: jest.fn(),
    } as unknown as jest.Mocked<MongooseMeetingRepository>;

    mockTaskRepository = {
      findAllForMeeting: jest.fn(),
    } as unknown as jest.Mocked<MongooseTaskRepository>;

    mockAccessService = {
      assertMeetingAccess: jest.fn(),
      getCurrentUserId: jest.fn(),
    } as unknown as jest.Mocked<MeetingAccessService>;

    secureMeetingService = new SecureMeetingService(
      mockMeetingRepository,
      mockTaskRepository,
      mockAccessService
    );
  });

  it("while requiring a meeting, the tasks for the meeting are fetched as well", async () => {
    mockAccessService.assertMeetingAccess.mockResolvedValue(undefined);
    mockAccessService.getCurrentUserId.mockReturnValue("user-id");
    mockMeetingRepository.findById.mockResolvedValue({
      id: "1",
      title: "Meeting 1",
    } as IMeeting);

    mockTaskRepository.findAllForMeeting.mockResolvedValue([
      {
        id: "1",
        title: "Task 1",
      } as ITask,
    ]);

    const result = await secureMeetingService.findByMeetingId("1");

    expect(mockAccessService.assertMeetingAccess).toHaveBeenCalledWith("1");
    expect(mockTaskRepository.findAllForMeeting).toHaveBeenCalledWith({
      meetingId: "1",
      userId: "user-id",
    });

    expect(result).toEqual({
      id: "1",
      title: "Meeting 1",
      tasks: [
        {
          id: "1",
          title: "Task 1",
        } as ITask,
      ],
    });
  });
});
