import React from "react";
import { useParams } from "react-router-dom";
import { useGetAuthenticated, usePutAuthenticated } from "../../../utils/http";
import "./SingleMeetingPage.scss";
import TaskList from "../../tasks/TaskList";
import { IMeetingWithTasks } from "../../../model/meeting.model";
import Transcript from "./transcript/Transcript";

const SingleMeetingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { mutate: updateTranscript } = usePutAuthenticated(
    `/api/meetings/${id}/transcript`,
    { invalidateKey: `meeting-${id}` }
  );

  const { data: meeting, isLoading } = useGetAuthenticated<IMeetingWithTasks>(
    `/api/meetings/${id}`,
    {
      cacheKey: `meeting-${id}`,
    }
  );

  if (isLoading) {
    return <p>Loading meeting...</p>;
  }

  if (!meeting) {
    return <p>Meeting not found.</p>;
  }

  const { title, date, participants, summary, actionItems, transcript, tasks } =
    meeting;

  const handleTranscriptChange = (transcript: string) => {
    updateTranscript({ transcript });
  };

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
        <Transcript
          transcript={transcript}
          onTranscriptChange={handleTranscriptChange}
        />
      </section>

      <TaskList tasks={tasks} />
    </div>
  );
};

export default SingleMeetingPage;
