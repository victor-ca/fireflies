// generalStats: {
//   totalMeetings: 100,
//   averageParticipants: 4.75,
//   totalParticipants: 475,
//   shortestMeeting: 15,
//   longestMeeting: 120,
//   averageDuration: 45.3,
// },
// topParticipants: [
//   { participant: "John Doe", meetingCount: 20 },
//   { participant: "Jane Smith", meetingCount: 18 },
//   { participant: "Bob Johnson", meetingCount: 15 },
//   { participant: "Alice Brown", meetingCount: 12 },
//   { participant: "Charlie Davis", meetingCount: 10 },
// ],
// meetingsByDayOfWeek: [
//   { dayOfWeek: 1, count: 10 },
//   { dayOfWeek: 2, count: 22 },
//   { dayOfWeek: 3, count: 25 },
//   { dayOfWeek: 4, count: 20 },
//   { dayOfWeek: 5, count: 18 },
//   { dayOfWeek: 6, count: 5 },
//   { dayOfWeek: 7, count: 0 },
// ],

import { MongooseMeeting } from "./meeting.mongoose";

export class MeetingStatsRepository {
  async getStatsByUserId(userId: string): Promise<unknown> {
    const generalStats = await MongooseMeeting.aggregate([
      { $match: { userId: userId } },
      {
        $group: {
          _id: null,
          totalMeetings: { $sum: 1 },
          totalParticipants: { $sum: { $size: "$participants" } },
        },
      },
      {
        $project: {
          _id: 0,
          totalMeetings: 1,
          totalParticipants: 1,
          averageParticipants: {
            $divide: ["$totalParticipants", "$totalMeetings"],
          },
        },
      },
    ]).exec();

    const stats = generalStats[0] || {
      totalMeetings: 0,
      totalParticipants: 0,
      averageParticipants: 0,
    };

    return {
      generalStats: stats,
    };
  }
}
