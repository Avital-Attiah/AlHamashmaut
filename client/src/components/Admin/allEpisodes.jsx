import React, { useEffect, useState } from "react";
import { getData } from "../../db-api";
import { useNavigate } from "react-router-dom";
import EpisodeDetails from "../Episodes/episodeDetails";
 import "../../style/allEpisodesAdminStyle.css"; // ייבוא קובץ CSS מותאם אישית

export default function AllEpisodes() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const limit = 5;

  const navigate = useNavigate();

  const fetchPosts = async (pageNumber = 0) => {
    try {
      const offset = pageNumber * limit;
      const response = await getData(`episodes?isFutureInterview=false&limit=${limit}&offset=${offset}`);
      const episodes = response.episodes || [];
      const totalCount = response.total ?? 0;

      if (pageNumber === 0) setPosts(episodes); // איפוס רשימה אם זה העמוד הראשון
      else setPosts((prev) => [...prev, ...episodes]);

      setTotal(totalCount);
      setPage(pageNumber);
    } catch (err) {
      setError(err.message || "שגיאה בטעינת הפרקים");
    }
  };

  useEffect(() => {
    fetchPosts(0); // קריאה נקייה ללא reset כפול
  }, []);

  const handleLoadMore = () => {
    fetchPosts(page + 1);
  };

  return (
  <div className="admin-section">
    <div className="page-container">
      <h2>כל הפרקים</h2>

      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <button className="add-button" onClick={() => navigate("episode/new")}>
          ➕ הוסף פרק
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="episodes-layout">
        <ul className="episodes-list">
          {posts.map((p) => (
            <li key={p.id}>
              <button className="episode-title" onClick={() => setSelectedPost(p)}>
                {p.title}
              </button>
            </li>
          ))}
          {posts.length < total && (
            <li>
              <button className="load-more" onClick={handleLoadMore}>
                טען עוד פרקים
              </button>
            </li>
          )}
        </ul>

        {selectedPost && (
          <div className="episode-details-container">
            <EpisodeDetails id={selectedPost.id} showComments={true} />
          </div>
        )}
      </div>
    </div>
  </div>
);
}