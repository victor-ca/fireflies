import { MeetingAccessService } from "../../auth/meeting-access.service";

import { MeetingStatsRepository } from "../repo/meeting.stats.repo";

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
