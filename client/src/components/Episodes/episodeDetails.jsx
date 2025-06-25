
import '../../style/episodeDetailsStyle.css';
import '../../style/global.css'
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getData, deleteData } from '../../db-api';
import Comments from './comments.jsx';
import Episode from './episode.jsx';


export default function EpisodeDetails({ id, showComments }) {
  const episodeId = id ?? useParams().id;
  const [episode, setEpisode] = useState(null);
  const [allEpisodes, setAllEpisodes] = useState([]);
  const navigate = useNavigate();

  const isAdminPage = window.location.pathname.includes('/admin');

  useEffect(() => {
    loadAllEpisodes();
  }, []);

  useEffect(() => {
    if (!episodeId || allEpisodes.length === 0) return;
    loadEpisodeFromList();
  }, [episodeId, allEpisodes]);

  const loadAllEpisodes = async () => {
    try {
      const response = await getData(`episodes?isFutureInterview=${!showComments}`);
      const episodes = Array.isArray(response) ? response : response.episodes; // 👈 תמיכה בשתי תצורות
      setAllEpisodes(episodes || []);
    } catch (err) {
      console.error('Error loading episodes list:', err);
    }
  };

  const loadEpisodeFromList = () => {
    const found = allEpisodes.find(ep => String(ep.id) === String(episodeId));
    setEpisode(found || null);
  };

  const handleDelete = async () => {
    if (!episode || !episode.id) return alert("לא נמצא פרק למחיקה");
    if (!window.confirm("האם את/ה בטוח/ה שברצונך למחוק את הפרק?")) return;

    const success = await deleteData(`episodes/${episode.id}`);
    if (success) {
      alert("הפרק נמחק בהצלחה");
      navigate('/admin');
    } else {
      alert("שגיאה במחיקת הפרק");
    }
  };

  return (
    <div className="episode-container">
      {!isAdminPage && (
        <div className="episode-sidebar">
          <h4>{episode && episode.isFutureInterview ? "ראיונות עתידיים נוספים" : "פרקים נוספים"}</h4>
          <div className="episode-list">
            {Array.isArray(allEpisodes) &&
              allEpisodes
                .filter(ep => String(ep.id) !== String(episodeId))
                .map(ep => (
                  <Episode key={ep.id} episode={ep} />
                ))}
          </div>
        </div>
      )}

      <div className="episode-main">
        {episode ? (
          <>
            <img
              src={`http://localhost:8080/episodes/image/${episode.picture}`}
              alt={episode.title}
              className="episode-image"
            />
            <h2>{episode.title}</h2>
            <p>{episode.body}</p>

            <div className="episode-platforms">
              {episode.spotifyLink && <a href={episode.spotifyLink} target="_blank" rel="noreferrer">🎧 Spotify</a>}
              {episode.appleLink && <a href={episode.appleLink} target="_blank" rel="noreferrer">🍏 Apple</a>}
              {episode.soundcloudLink && <a href={episode.soundcloudLink} target="_blank" rel="noreferrer">☁️ SoundCloud</a>}
            </div>

            <div className="episode-comments">
              <Comments episodeId={Number(episodeId)} isInterview={episode.isFutureInterview} />
            </div>

            {isAdminPage && (
              <div style={{ marginTop: '1rem' }}>
                <button onClick={() => navigate(`/episode/${id}/update`, { state: { episode } })}>
                  עדכן פרק
                </button>
                <button onClick={handleDelete} style={{ marginRight: '10px', color: 'red' }}>
                  🗑 מחק פרק
                </button>
              </div>
            )}
          </>
        ) : (
          <p>טוען פרק...</p>
        )}
      </div>
    </div>
  );
}

