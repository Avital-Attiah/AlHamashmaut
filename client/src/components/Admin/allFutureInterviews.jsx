// allFutureInterviews.jsx
import React, { useEffect, useState } from "react";
import { getData } from "../../db-api";
import { useNavigate } from "react-router-dom";
import EpisodeDetails from "../Episodes/episodeDetails";

export default function AllFutureInterviews() {
  const [interviews, setInterviews] = useState([]);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchInterviews = async () => {
    try {
      const data = await getData("episodes?isFutureInterview=true");
      setInterviews(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  return (
    <div className="admin-section">
      <h2>ראיונות עתידיים</h2>
      <button onClick={() => navigate("/admin/interview/new")}>➕ הוסף ראיון עתידי</button>
      {error && <p className="error">{error}</p>}

      <div style={{ display: "flex" }}>
        <ul style={{ flex: 1 }}>
          {interviews.map(interview => (
            <li key={interview.id}>
              <button onClick={() => setSelectedInterview(interview)}>{interview.title}</button>
            </li>
          ))}
        </ul>

        {selectedInterview && (
          <div style={{ flex: 2, marginRight: "2rem" }}>
            <EpisodeDetails id={selectedInterview.id} showComments={false} />
          </div>
        )}
      </div>
    </div>
  );
}
