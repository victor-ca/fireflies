import { IMeeting } from "../../meeting.model";

export class MockMeetingAiService {
  private readonly summaries = [
    "The team discussed project timelines and resource allocation.",
    "Key product features were reviewed and prioritized for the next sprint.",
    "Customer feedback was analyzed, leading to several action items.",
    "Budget constraints were addressed, and cost-cutting measures were proposed.",
    "The marketing strategy for Q4 was outlined and approved.",
  ];

  private readonly actionItems = [
    "Update project timeline by EOD",
    "Schedule follow-up meeting with design team",
    "Create detailed report on customer feedback",
    "Research potential new suppliers",
    "Draft email to stakeholders about project status",
    "Prepare presentation for next board meeting",
    "Review and update team KPIs",
    "Organize team building event",
    "Conduct security audit of current systems",
    "Reach out to potential partners for collaboration",
  ];

  async generateSummary(_meeting: IMeeting) {
    return this.summaries[Math.floor(Math.random() * this.summaries.length)];
  }

  async generateActionItems(_meeting: IMeeting) {
    const numItems = Math.floor(Math.random() * 3) + 1;
    const items = [];
    for (let i = 0; i < numItems; i++) {
      const randomIndex = Math.floor(Math.random() * this.actionItems.length);
      items.push(this.actionItems[randomIndex]);
    }
    return items;
  }
}
