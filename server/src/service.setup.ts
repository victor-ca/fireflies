import { MeetingAccessService } from "./auth/meeting-access.service";
import { MockMeetingAiService } from "./meetings/ai/meeting-ai.service";
import { MeetingSummarizerService } from "./meetings/ai/meeting-sumarizer.service";
import { MongooseMeetingRepository } from "./meetings/repo/meeting.repository";
import { SecureMeetingService } from "./meetings/repo/meeting.service";
import { MongooseTaskRepository } from "./tasks/repo/tasks.repo";
import { SecureTaskService } from "./tasks/repo/tasks.service";

const meetingRepository = new MongooseMeetingRepository();
const taskRepository = new MongooseTaskRepository();

const getMeetingAccessService = (userId: string | undefined) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  return new MeetingAccessService(meetingRepository, userId);
};
export const useSecureMeetingService = (userId: string | undefined) => {
  return new SecureMeetingService(
    meetingRepository,
    taskRepository,
    getMeetingAccessService(userId)
  );
};

export const useSecureTaskService = (userId: string | undefined) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  return new SecureTaskService(taskRepository, getMeetingAccessService(userId));
};

export const useMeetingSummarizer = (): MeetingSummarizerService => {
  return new MeetingSummarizerService(
    meetingRepository,
    taskRepository,
    new MockMeetingAiService()
  );
};
