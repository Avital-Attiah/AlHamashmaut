import React, { useEffect, useState } from "react";
import { getData } from "../../db-api";
import { useNavigate } from "react-router-dom";
import EpisodeDetails from "../Episodes/episodeDetails";

export default function AllFutureInterviews() {
  const [interviews, setInterviews] = useState([]);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const limit = 5;

  const navigate = useNavigate();

  const fetchInterviews = async (pageNumber = 0) => {
    try {
      const offset = pageNumber * limit;
      const response = await getData(`episodes?isFutureInterview=true&limit=${limit}&offset=${offset}`);
      const episodes = response.episodes || [];
      const totalCount = response.total ?? 0;

      if (pageNumber === 0) setInterviews(episodes); // אתחול
      else setInterviews((prev) => [...prev, ...episodes]);

      setTotal(totalCount);
      setPage(pageNumber);
    } catch (err) {
      setError(err.message || "שגיאה בטעינת ראיונות");
    }
  };

  useEffect(() => {
    fetchInterviews(0); // רק קריאה אחת – בלי reset ידני
  }, []);

  const handleLoadMore = () => {
    fetchInterviews(page + 1);
  };

  return (
    <div className="admin-section">
      <h2>ראיונות עתידיים</h2>
      <button onClick={() => navigate("/admin/interview/new")}>➕ הוסף ראיון עתידי</button>
      {error && <p className="error">{error}</p>}

      <div style={{ display: "flex" }}>
        <ul style={{ flex: 1 }}>
          {interviews.map((interview) => (
            <li key={interview.id}>
              <button onClick={() => setSelectedInterview(interview)}>{interview.title}</button>
            </li>
          ))}
          {interviews.length < total && (
            <li style={{ marginTop: '1rem' }}>
              <button onClick={handleLoadMore}>טען עוד ראיונות</button>
            </li>
          )}
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
