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
import '../../style/episodeStyle.css'

const Episode = ({ episode }) => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const { id, title, body, picture, isFutureInterview } = episode;

  // לחיצה על הקלף תעביר לעמוד תגובות או שאלות לפי סוג הפרק
  const handleCardClick = () => {
    

    if (isFutureInterview)
      navigate(`/episode/${id}/qustion`);
    else
      navigate(`/episode/${id}/comment`);
  };

  // --- NEW: פונקציה למחיקת פרק (למנהלים בלבד)
  const handleDeleteClick = async (e) => {
    e.stopPropagation(); // מונע מעבר לעמוד הפרק

    if (!window.confirm("האם את בטוחה שברצונך למחוק את הפרק?")) return;

    try {
      const response = await fetch(`http://localhost:8080/episodes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (response.ok) {
        alert("הפרק נמחק בהצלחה");
        window.location.reload(); // אפשר להחליף בהסרת הפרק מה־state אם את שולטת בזה
      } else {
        const message = await response.text();
        alert(`שגיאה: ${message}`);
      }
    } catch (error) {
      alert("אירעה שגיאה במחיקה");
      console.error("שגיאת מחיקה:", error);
    }
  };

  return (
    <div className="episode-card" onClick={handleCardClick}>
      {picture && <img src={`http://localhost:8080/episodes/image/${episode.picture}`} alt={title} className="episode-thumbnail" />}
      <h3>{title}</h3>
      <p>{body.slice(0, 100)}...</p>

      {/* {user?.userType === "admin" && ( */}
        {/* <button
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
        </button> */}
      {/* )} */}

      {/* --- NEW: כפתור מחיקה מוצג רק למנהלים */}
      {user?.userType === "admin" && (
        <button
          onClick={handleDeleteClick}
          className="delete-button"
          style={{
            marginTop: "10px",
            padding: "5px 10px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          מחק
        </button>
      )}
    </div>
  );
};

export default Episode;
