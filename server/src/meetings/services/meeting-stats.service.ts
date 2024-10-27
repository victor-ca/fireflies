import { MeetingAccessService } from "../../auth/meeting-access.service.js";

import { MeetingStatsRepository } from "../repo/meeting.stats.repo.js";

export class SecureMeetingStatsService {
  constructor(
    private readonly statsRepository: MeetingStatsRepository,
    private readonly accessService: MeetingAccessService
  ) {}

  async getStats(userId: string) {
    await this.accessService.assertUserAccess(userId);
    return this.statsRepository.getStatsByUserId(userId);
  }
}
