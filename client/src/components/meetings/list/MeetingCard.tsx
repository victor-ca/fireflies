import React from "react";
import { Link } from "react-router-dom";
import { IMeeting } from "../../../model/meeting.model";
import { formatDistanceToNow } from "date-fns";

interface MeetingCardProps {
  meeting: IMeeting;
}

const MeetingCard: React.FC<MeetingCardProps> = ({ meeting }) => {
  return (
    <div className="meeting-item">
      <article>
        <h2>{meeting.title}</h2>
        <p>
          Date: {new Date(meeting.date).toLocaleDateString()} (
          {formatDistanceToNow(new Date(meeting.date), { addSuffix: true })})
        </p>
        <p>Participants: {meeting.participants.join(", ")}</p>
        <p>Summary: {meeting.summary}</p>
        <Link to={`/meetings/${meeting.id}`} className="view-button">
          View
        </Link>
      </article>
    </div>
  );
};

export default MeetingCard;
