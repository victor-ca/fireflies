import React, { useCallback, useState } from "react";

interface TranscriptProps {
  transcript: string;
  onTranscriptChange?: (newTranscript: string) => void;
}

const Transcript: React.FC<TranscriptProps> = ({
  transcript,
  onTranscriptChange,
}) => {
  const [editedTranscript, setEditedTranscript] = useState(transcript);

  const [isEditing, setIsEditing] = useState(false);

  const handleTranscriptChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newTranscript = event.target.value;
    setEditedTranscript(newTranscript);
  };

  const handleSave = useCallback(() => {
    onTranscriptChange?.(editedTranscript);
    setIsEditing(false);
  }, [editedTranscript, onTranscriptChange]);

  return (
    <>
      <h2>Transcript</h2>

      <div className="transcript-section">
        {isEditing ? (
          <textarea
            value={editedTranscript}
            onChange={handleTranscriptChange}
            rows={10}
            style={{ width: "100%", minHeight: "200px" }}
          />
        ) : (
          <p>{transcript}</p>
        )}
        {isEditing ? (
          <div className="transcript-section-actions">
            <button
              onClick={() => {
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
            <button onClick={handleSave}>Save</button>
          </div>
        ) : (
          <button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Edit
          </button>
        )}
      </div>
    </>
  );
};

export default Transcript;
