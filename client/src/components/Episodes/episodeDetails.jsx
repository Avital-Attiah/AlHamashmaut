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
import React, { useEffect, useState } from 'react';
import { getData, addData, getCurrentUser } from '.../db-api.jsx';
import CommentItem from './comment.jsx';

export default function EpisodeDetails({ episodeId }) {
  const [episode, setEpisode] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [allEpisodes, setAllEpisodes] = useState([]);

  const user = getCurrentUser();

  useEffect(() => {
    if (!episodeId) return;
    loadEpisode();
    loadComments();
    loadAllEpisodes();
  }, [episodeId]);

  const loadEpisode = async () => {
    try {
      const ep = await getData(`episodes/${episodeId}`);
      setEpisode(ep);
    } catch (err) {
      console.error('Error loading episode:', err);
    }
  };

  const loadComments = async () => {
    try {
      const data = await getData(`comments?episodeId=${episodeId}`);
      setComments(data);
    } catch (err) {
      console.error('Error loading comments:', err);
    }
  };

  const loadAllEpisodes = async () => {
    try {
      const episodes = await getData('episodes');
      setAllEpisodes(episodes);
    } catch (err) {
      console.error('Error loading episodes list:', err);
    }
  };

  const handleAddComment = async () => {
    try {
      if (!newComment.trim()) return;
      const created = await addData('comments', {
        body: newComment,
        userId: user?.id,
        episodeId,
      });
      setComments(prev => [...prev, created]);
      setNewComment('');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.main}>
        {episode && (
          <>
            <img src={episode.imageUrl} alt="Episode" style={styles.image} />
            <h2>{episode.title}</h2>
            <p>{episode.description}</p>
            <div style={styles.platforms}>
              <a href={episode.spotifyLink} target="_blank" rel="noreferrer">🎧 Spotify</a>
              <a href={episode.appleLink} target="_blank" rel="noreferrer">🍏 Apple</a>
              <a href={episode.soundcloudLink} target="_blank" rel="noreferrer">☁️ SoundCloud</a>
            </div>

            <div style={styles.commentSection}>
              <h3>תגובות</h3>
              <textarea
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder="כתוב תגובה..."
                style={styles.textarea}
              />
              <button onClick={handleAddComment}>הוסף תגובה</button>
              <div>
                {comments.map(c => (
                  <CommentItem key={c.id} comment={c} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div style={styles.sidebar}>
        <h4>פרקים נוספים</h4>
        <ul style={styles.episodeList}>
          {allEpisodes
            .filter(ep => ep.id !== episodeId)
            .map(ep => (
              <li key={ep.id} style={styles.episodeItem}>
                <img
                  src={ep.imageUrl}
                  alt="thumb"
                  style={styles.thumb}
                  onClick={() => window.location.href = `/episode/${ep.id}`}
                />
                <p>{ep.title}</p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    gap: '20px',
    padding: '20px',
  },
  main: {
    flex: 3,
  },
  sidebar: {
    flex: 1,
    borderLeft: '1px solid #ccc',
    paddingLeft: '15px',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
  platforms: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
  },
  commentSection: {
    marginTop: '30px',
  },
  textarea: {
    width: '100%',
    height: '60px',
    marginBottom: '10px',
  },
  episodeList: {
    listStyle: 'none',
    padding: 0,
  },
  episodeItem: {
    cursor: 'pointer',
    marginBottom: '10px',
  },
  thumb: {
    width: '100%',
    height: 'auto',
    borderRadius: '5px',
  },
};
