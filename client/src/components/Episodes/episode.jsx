// import { useState } from "react";
// import "../../style/episodeStyle.css"; // Import your CSS styles

// const Episode = ({ episode, onSelect }) => {
//   const { title, body, picture } = episode;

//   return (
//     <div className="episode-card" onClick={() => onSelect(episode)}>
//       {picture && <img src={picture} alt={title} className="episode-thumbnail" />}
//       <h3>{title}</h3>
//       <p>{body.slice(0, 100)}...</p> {/* תצוגה מקוצרת */}
//     </div>
//   );
// };

// export default Episode;
// episode.jsx
import { useNavigate } from "react-router-dom";

const Episode = ({ episode }) => {
  const navigate = useNavigate();
  const { id, title, body, picture,isFutureInterview } = episode;

  return (
    <div className="episode-card" onClick={() => {
//       if(isFutureInterview)
//       navigate(`/episodes/${id}/qustion`);
// else
//       navigate(`/episodes/${id}/comment`);
      navigate(`/episodes/${id}`);

    

    }
    }>
      {picture && <img src={picture} alt={title} className="episode-thumbnail" />}
      <h3>{title}</h3>
      <p>{body.slice(0, 100)}...</p>
    </div>
  );
};

export default Episode;

