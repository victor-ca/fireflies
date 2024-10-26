import React, { useState } from "react";
import { usePostAuthenticated } from "../../../utils/http";
import "./NewMeeting.scss";
import { useNavigate } from "react-router-dom";

const NewMeeting: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [participants, setParticipants] = useState("");

  const createMeeting = usePostAuthenticated<{
    title: string;
    date: string;
    participants: string[];
  }>("/api/meetings", { invalidateKey: "meetings" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMeeting.mutateAsync({
        title,
        date,
        participants: participants.split(",").map((p) => p.trim()),
      });
      // Reset form or redirect user after successful creation
      setTitle("");
      setDate("");
      setParticipants("");
      alert("Meeting created successfully!");
      navigate("/meetings");
    } catch (error) {
      console.error("Failed to create meeting:", error);
      alert("Failed to create meeting. Please try again.");
    }
  };

  return (
    <div id="new-meeting">
      <h1>Create New Meeting</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="participants">Participants</label>
          <input
            type="text"
            id="participants"
            name="participants"
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
            placeholder="Enter participants separated by commas"
          />
        </div>

        <button type="submit">Create Meeting</button>
      </form>
    </div>
  );
};

export default NewMeeting;
