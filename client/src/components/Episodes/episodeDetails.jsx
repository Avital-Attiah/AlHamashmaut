// import { useState } from "react";
// import ".../style/episodeStyle.css"; // Import your CSS styles

// const EpisodeDetails = ({ episode, comments, onAddComment }) => {
//   const [newComment, setNewComment] = useState("");

//   const handleSubmit = () => {
//     if (newComment.trim()) {
//       onAddComment(newComment);
//       setNewComment("");
//     }
//   };

//   return (
//     <div className="episode-details">
//       <h2>{episode.title}</h2>
//       {episode.picture && <img src={episode.picture} alt={episode.title} />}
//       <p>{episode.body}</p>

//       <h4>תגובות:</h4>
//       <ul>
//         {comments.map((c, i) => <li key={i}>{c}</li>)}
//       </ul>

//       <textarea
//         placeholder="הוסף תגובה..."
//         value={newComment}
//         onChange={(e) => setNewComment(e.target.value)}
//       />
//       <button onClick={handleSubmit}>הוסף תגובה</button>
//     </div>
//   );
// };

// export default EpisodeDetails;
import '../../style/episodeDetailsStyle.css';
// episodeDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getData } from '../../db-api';
import Comments from './comments.jsx';
import Episode from './episode.jsx';
export default function EpisodeDetails({showComments}) {
  const { id: episodeId } = useParams();
  const [episode, setEpisode] = useState(null);
  const [allEpisodes, setAllEpisodes] = useState([]);

  useEffect(() => {
    loadAllEpisodes();
  }, []);

  useEffect(() => {
    if (!episodeId || allEpisodes.length === 0) return;
    loadEpisodeFromList();
  }, [episodeId, allEpisodes]);

  const loadAllEpisodes = async () => {
    try {
      const episodes = await getData( `episodes?isFutureInterview=${!showComments}`);
      setAllEpisodes(episodes);
    } catch (err) {
      console.error('Error loading episodes list:', err);
    }
  };

  const loadEpisodeFromList = () => {
    const found = allEpisodes.find(ep => String(ep.id) === String(episodeId));
    console.log("Episode from list:", found);
    setEpisode(found || null);
  };

  return (
    <div className="episode-container">
      {/* <div className="episode-sidebar">
        <h4>פרקים נוספים</h4>
        <ul className="episode-list">
          {allEpisodes
            .filter(ep => String(ep.id) !== String(episodeId))
            .map(ep => (
              <li key={ep.id} className="episode-item" onClick={() => window.location.href = `/episodes/${ep.id}`}>
                <img src={ep.picture} alt={ep.title} className="episode-thumb" />
                <p>{ep.title}</p>
              </li>
            ))}
        </ul>
      </div> */}
      <div className="episode-sidebar">
  <h4>פרקים נוספים</h4>
  <div className="episode-list">
    {allEpisodes
      .filter(ep => String(ep.id) !== String(episodeId))
      .map(ep => (
        <Episode key={ep.id} episode={ep} />
      ))}
  </div>
</div>

      <div className="episode-main">
        {episode ? (
          <>
            <img src={episode.picture} alt={episode.title} className="episode-image" />
            <h2>{episode.title}</h2>
            <p>{episode.body}</p>

            <div className="episode-platforms">
              {episode.spotifyLink && <a href={episode.spotifyLink} target="_blank" rel="noreferrer">🎧 Spotify</a>}
              {episode.appleLink && <a href={episode.appleLink} target="_blank" rel="noreferrer">🍏 Apple</a>}
              {episode.soundcloudLink && <a href={episode.soundcloudLink} target="_blank" rel="noreferrer">☁️ SoundCloud</a>}
            </div>

            <div className="episode-comments">
              <Comments episodeId={Number(episodeId)} />
            </div>
          </>
        ) : (
          <p>טוען פרק...</p>
        )}
      </div>
    </div>
  );
}
