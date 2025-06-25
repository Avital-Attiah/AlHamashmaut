import React, { useEffect, useState } from "react";
import { getData } from "../../db-api";
import { useNavigate } from "react-router-dom";
import EpisodeDetails from "../Episodes/episodeDetails";
import "../../style/allEpisodesStyle.css"; // ייבוא קובץ CSS מותאם אישית
import '../../style/global.css'

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
      <h2>כל הפרקים</h2>
      <button onClick={() => navigate("episode/new")}>➕ הוסף פרק</button>
      {error && <p className="error">{error}</p>}

      <div style={{ display: "flex" }}>
        <ul style={{ flex: 1 }}>
          {posts.map((p) => (
            <li key={p.id}>
              <button onClick={() => setSelectedPost(p)}>{p.title}</button>
            </li>
          ))}
          {posts.length < total && (
            <li style={{ marginTop: '1rem' }}>
              <button onClick={handleLoadMore}>טען עוד פרקים</button>
            </li>
          )}
        </ul>

        {selectedPost && (
          <div style={{ flex: 2, marginRight: "2rem" }}>
            <EpisodeDetails id={selectedPost.id} showComments={true} />
          </div>
        )}
      </div>
    </div>
  );
}
