import React, { useEffect, useState } from "react";
import { getData } from "../../db-api";
import { useNavigate } from "react-router-dom";
import EpisodeDetails from "../Episodes/episodeDetails";
import "../../style/allEpisodesAdminStyle.css"; // מתבסס על אותו עיצוב

export default function AllFutureInterviews() {
  const [interviews, setInterviews] = useState([]);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const limit = 3;

  const navigate = useNavigate();

  const fetchInterviews = async (pageNumber = 0) => {
    try {
      const offset = pageNumber * limit;
      const response = await getData(`episodes?isFutureInterview=true&limit=${limit}&offset=${offset}`);
      const episodes = response.episodes || [];
      const totalCount = response.total ?? 0;

      if (pageNumber === 0) setInterviews(episodes);
      else setInterviews((prev) => [...prev, ...episodes]);

      setTotal(totalCount);
      setPage(pageNumber);
    } catch (err) {
      setError(err.message || "שגיאה בטעינת ראיונות");
    }
  };

  useEffect(() => {
    fetchInterviews(0);
  }, []);

  const handleLoadMore = () => {
    fetchInterviews(page + 1);
  };

  return (
    <div className="admin-section">
      <div className="page-container">
        <h2>ראיונות עתידיים</h2>
        <button className="add-button" onClick={() => navigate("/admin/allFutureInterviews/interview/new")}>➕ הוסף ראיון עתידי</button>
        {error && <p className="error">{error}</p>}

        <div className="episodes-layout">
          <ul className="episodes-list">
            {interviews.map((interview) => (
              <li key={interview.id}>
                <button className="episode-title" onClick={() => setSelectedInterview(interview)}>{interview.title}</button>
              </li>
            ))}
            {interviews.length < total && (
              <li>
                <button className="load-more" onClick={handleLoadMore}>טען עוד ראיונות</button>
              </li>
            )}
          </ul>

          {selectedInterview && (
            <div className="episode-details-container">
              <EpisodeDetails id={selectedInterview.id} showComments={false} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
