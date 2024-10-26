import React from "react";
import { useGetAuthenticated } from "../../../utils/http";
import { IMeeting } from "../../../model/meeting.model";
import "./MeetingPage.scss";
import MeetingCard from "./MeetingCard";
import { MeetingStats } from "./MeetingStats";

const MeetingPage: React.FC = () => {
  const { data, isLoading } = useGetAuthenticated<{
    total: number;
    limit: number;
    page: number;
    data: IMeeting[];
  }>("/api/meetings", {
    cacheKey: "meetings",
  });

  if (isLoading) {
    return <p>Loading meetings...</p>;
  }
  const { data: meetings } = data;

  if (!meetings?.length) {
    return <p>No meetings found.</p>;
  }

  return (
    <div id="meeting-list">
      <h1>Stats</h1>
      <MeetingStats />

      <h1>Meetings</h1>
      <div className="meeting-list">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </div>
  );
};

export default MeetingPage;
