
// import { useNavigate } from "react-router-dom";

// const Episode = ({ episode }) => {
//   const navigate = useNavigate();
 
//   const { id, title, body, picture, isFutureInterview } = episode;

//   return (
//     <div className="episode-card" onClick={() => {
//       if (isFutureInterview)
//         navigate(`/episode/${id}/qustion`);
//       else
//         navigate(`/episode/${id}/comment`);
//       // navigate(`/episodes/${id}`);



//     }
//     }>
//       {picture && <img src={picture} alt={title} className="episode-thumbnail" />}
//       <h3>{title}</h3>
//       <p>{body.slice(0, 100)}...</p>
//     </div>
//   );
// };

// export default Episode;

import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../db-api.jsx"; // עדכן לפי מיקום הקובץ שלך

const Episode = ({ episode }) => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const { id, title, body, picture, isFutureInterview } = episode;

  const handleCardClick = () => {
    if (isFutureInterview)
      navigate(`/episode/${id}/qustion`);
    else
      navigate(`/episode/${id}/comment`);
  };

  const handleUpdateClick = (e) => {
    e.stopPropagation(); // מונע מעבר לדף הצפייה בפרק
    // navigate(`/episode/${id}/update`);
    navigate(`/episode/${id}/update`, { state: { episode } });

  };

  return (
    <div className="episode-card" onClick={handleCardClick}>
      {picture && <img src={picture} alt={title} className="episode-thumbnail" />}
      <h3>{title}</h3>
      <p>{body.slice(0, 100)}...</p>

      {/* {user?.userType === "admin" && ( */}
        <button
          onClick={handleUpdateClick}
          className="update-button"
          style={{
            marginTop: "10px",
            padding: "5px 10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          עדכן
        </button>
      {/* )} */}
    </div>
  );
};

export default Episode;
