
import React, { useEffect, useState } from "react";
import { getData } from "../../db-api";
import { useNavigate } from "react-router-dom";
import EpisodeDetails from "../Episodes/episodeDetails";


export default function AllEpisodes() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const data = await getData("episodes?isFutureInterview=false");
      setPosts(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="admin-section">
      <h2>כל הפרקים</h2>
      <button onClick={() => navigate("/episode/new")}>➕הוסף פרק</button>
      {error && <p className="error">{error}</p>}

      <div style={{ display: "flex" }}>
        <ul style={{ flex: 1 }}>
          {posts.map(p => (
            <li key={p.id}>
              <button onClick={() => setSelectedPost(p)}>{p.title}</button>
            </li>
          ))}
        </ul>

        {selectedPost && (
          <div style={{ flex: 2, marginRight: "2rem" }}>
            <EpisodeDetails id={selectedPost.id} showComments={true} />
          </div>
        )}  

      
    </div>
    </div >
  );
}
