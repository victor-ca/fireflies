import React from "react";
import { useParams } from "react-router-dom";
import { useGetAuthenticated } from "../../../utils/http";
import "./SingleMeetingPage.scss";
import TaskList from "../../tasks/TaskList";
import { IMeetingWithTasks } from "../../../model/meeting.model";

const SingleMeetingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetAuthenticated<IMeetingWithTasks>(
    `/api/meetings/${id}`,
    {
      cacheKey: `meeting-${id}`,
    }
  );

  if (isLoading) {
    return <p>Loading meeting...</p>;
  }

  if (!data) {
    return <p>Meeting not found.</p>;
  }

  const { title, date, participants, summary, actionItems, transcript, tasks } =
    data;

  return (
    <div id="single-meeting">
      <h1>{title}</h1>
      <p>Date: {new Date(date).toLocaleString()}</p>
      <p>Participants: {participants.join(", ")}</p>

      <section>
        <h2>Summary</h2>
        <p>{summary}</p>
      </section>

      <section>
        <h2>Action Items</h2>
        <ul>
          {actionItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Transcript</h2>
        <pre>{transcript}</pre>
      </section>

      <TaskList tasks={tasks} />
    </div>
  );
};

export default SingleMeetingPage;
