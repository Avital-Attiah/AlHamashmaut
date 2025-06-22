
// import { useState } from "react";
// import { addData, updateData, getCurrentUser } from "../../db-api";
// import { useLocation } from "react-router-dom";
// import "../../style/episodeForm.css"; // חשוב! לוודא שהקובץ נמצא באותה תיקייה



// export default function EpisodeForm({ onSuccess }) {
//   const location = useLocation();
//   const episode = location?.state?.episode||null;
//   const id = episode?.id;

//   const [title, setTitle] = useState(episode?.title || "");
//   const [body, setBody] = useState(episode?.body || "");
//   const [picture, setPicture] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [error, setError] = useState(null);

//   const isEditMode = Boolean(episode);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     const formData = new FormData();
//     formData.append("title", title.trim());
//     formData.append("body", body.trim());
//     formData.append("adminId", getCurrentUser()?.id || episode?.adminId || 1);

//     if (picture) {
//       formData.append("picture", picture);
//     } else if (isEditMode && episode?.picture) {
//       formData.append("existingPicture", episode.picture);
//     }

//     try {
//       if (isEditMode) {
//         await updateData(`episodes/${id}`, formData, true);
//       } else {
//         await addData("episodes", formData, true);
//       }
//       if (onSuccess) onSuccess();
//     } catch (err) {
//       setError(err.message || "שגיאה");
//     }
//   };

//   const handlePictureChange = (e) => {
//     const file = e.target.files[0];
//     setPicture(file);
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewUrl(reader.result);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setPreviewUrl(null);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="episode-form">
//       <h2>{isEditMode ? "עדכון פרק" : "הוספת פרק חדש"}</h2>

//       <label>כותרת:</label>
//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         required
//       />

//       <label>תוכן:</label>
//       <textarea
//         value={body}
//         onChange={(e) => setBody(e.target.value)}
//         required
//       />

//       <label>בחרי תמונה:</label>
//       <input type="file" accept="image/*" onChange={handlePictureChange} />

//       {previewUrl && (
//         <>
//           <label>תצוגה מקדימה:</label>
//           <img src={previewUrl} alt="תצוגה מקדימה" />
//         </>
//       )}

//       {!previewUrl && isEditMode && episode?.picture && (
//         <>
//           <label>תמונה קיימת:</label>
//           <img
//             src={`http://localhost:8080/episodes/image/${episode.picture}`}
//             alt="תמונה קיימת"
//           />
//         </>
//       )}

//       {error && <div className="error">{error}</div>}

//       <button type="submit">{isEditMode ? "עדכן" : "שמור"}</button>
//     </form>
//   );
// }
import { useState } from "react";
import { addData, updateData, getCurrentUser } from "../../db-api";
import { useLocation } from "react-router-dom";
import "../../style/episodeForm.css";

export default function EpisodeForm({ onSuccess }) {
  const location = useLocation();
  const episode = location?.state?.episode || null;
  const id = episode?.id;

  const [title, setTitle] = useState(episode?.title || "");
  const [body, setBody] = useState(episode?.body || "");
  const [picture, setPicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isFutureInterview, setIsFutureInterview] = useState(
    episode?.isFutureInterview || false
  );
  const [error, setError] = useState(null);

  const isEditMode = Boolean(episode);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("body", body.trim());
    formData.append("adminId", getCurrentUser()?.id || episode?.adminId || 1);
    formData.append("isFutureInterview", isFutureInterview);

    if (picture) {
      formData.append("picture", picture);
    } else if (isEditMode && episode?.picture) {
      formData.append("existingPicture", episode.picture);
    }

    try {
      if (isEditMode) {
        await updateData(`episodes/${id}`, formData, true);
      } else {
        await addData("episodes", formData, true);
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message || "שגיאה");
    }
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    setPicture(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="episode-form">
      <h2>{isEditMode ? "עדכון פרק" : "הוספת פרק חדש"}</h2>

      <label>כותרת:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label>תוכן:</label>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />

      <label>תמונה:</label>
      <input type="file" accept="image/*" onChange={handlePictureChange} />

      {/* תצוגת תמונה */}
      {previewUrl && (
        <>
          <label>תצוגה מקדימה:</label>
          <img src={previewUrl} alt="תצוגה מקדימה" />
        </>
      )}

      {!previewUrl && isEditMode && episode?.picture && (
        <>
          <label>תמונה קיימת:</label>
          <img
            src={`http://localhost:8080/episodes/image/${episode.picture}`}
            alt="תמונה קיימת"
          />
        </>
      )}

      {/* שדה isFutureInterview */}
      <label>
        <input
          type="checkbox"
          checked={isFutureInterview}
          onChange={(e) => setIsFutureInterview(e.target.checked)}
          disabled={isEditMode} // רק בהוספה אפשר לשנות
        />{" "}
        האם מדובר בראיון עתידי?
      </label>

      {error && <div className="error">{error}</div>}

      <button type="submit">{isEditMode ? "עדכן" : "שמור"}</button>
    </form>
  );
}
