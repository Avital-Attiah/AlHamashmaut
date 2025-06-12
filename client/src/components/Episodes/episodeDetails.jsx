import { useState } from "react";
import ".../style/episodeStyle.css"; // Import your CSS styles

const EpisodeDetails = ({ episode, comments, onAddComment }) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  return (
    <div className="episode-details">
      <h2>{episode.title}</h2>
      {episode.picture && <img src={episode.picture} alt={episode.title} />}
      <p>{episode.body}</p>

      <h4>תגובות:</h4>
      <ul>
        {comments.map((c, i) => <li key={i}>{c}</li>)}
      </ul>

      <textarea
        placeholder="הוסף תגובה..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={handleSubmit}>הוסף תגובה</button>
    </div>
  );
};

export default EpisodeDetails;
