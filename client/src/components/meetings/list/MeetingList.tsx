import React from "react";
import { useGetAuthenticated } from "../../../utils/http";
import { IMeeting } from "../../../model/meeting.model";
import "./MeetingList.scss";

const MeetingList: React.FC = () => {
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
      <h1>Meeting List</h1>
      <div className="meeting-list">
        {meetings.map((meeting) => (
          <div key={meeting.id} className="meeting-item">
            <article>
              <h2>{meeting.title}</h2>
              <p>Date: {new Date(meeting.date).toLocaleDateString()}</p>
              <p>Participants: {meeting.participants.join(", ")}</p>
              <p>Summary: {meeting.summary}</p>
              <section>
                <h3>Action Items:</h3>
                <ul>
                  {meeting.actionItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetingList;
