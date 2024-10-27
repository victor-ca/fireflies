import { MeetingAccessService } from "./auth/meeting-access.service.js";
import { MockMeetingAiService } from "./meetings/services/ai-sumarizer/meeting-ai.service.js";
import { MeetingSummarizerService } from "./meetings/services/ai-sumarizer/meeting-sumarizer.service.js";
import { MongooseMeetingRepository } from "./meetings/repo/meeting.repository.js";
import { SecureMeetingService } from "./meetings/services/meeting.service.js";
import { MongooseTaskRepository } from "./tasks/repo/tasks.repo.js";
import { SecureTaskService } from "./tasks/repo/tasks.service.js";
import { SecureMeetingStatsService } from "./meetings/services/meeting-stats.service.js";
import { MeetingStatsRepository } from "./meetings/repo/meeting.stats.repo.js";

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

export const useSecureMeetingStatsService = (userId: string | undefined) => {
  return new SecureMeetingStatsService(
    new MeetingStatsRepository(),
    getMeetingAccessService(userId)
  );
};
