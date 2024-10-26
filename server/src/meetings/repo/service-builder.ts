import { MongooseMeetingRepository } from "./meeting.repository";
import { SecureMeetingService } from "./meeting.service";

const meetingRepository = new MongooseMeetingRepository();

export const useSecureMeetingService = (userId: string | undefined) => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  return new SecureMeetingService(meetingRepository, userId);
};
