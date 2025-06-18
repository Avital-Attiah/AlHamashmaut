import { useState } from "react";
import { addData, updateData, getCurrentUser } from "../../db-api";
import { useLocation } from "react-router-dom";

export default function EpisodeForm({ initialData = null, onSuccess }) {
  const location = useLocation();
  const episode = location?.state?.episode;
  const id = episode?.id;

  const [title, setTitle] = useState(episode?.title || "");
  const [body, setBody] = useState(episode?.body || "");
  const [picture, setPicture] = useState(null);
  const [error, setError] = useState(null);

  const isEditMode = Boolean(episode); // רק אם יש episode – אנחנו במצב עריכה

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();

    // הוספת שדות תמיד – גם אם המשתמש לא שינה כלום
    formData.append("title", title || episode?.title || "");
    formData.append("body", body || episode?.body || "");
    formData.append("adminId", getCurrentUser()?.id || episode?.adminId || 1);

    // אם המשתמש בחר תמונה חדשה
    if (picture) {
      formData.append("picture", picture);
    } else if (isEditMode && episode?.picture) {
      // כדי שהשרת ידע להשאיר את התמונה הקיימת אם לא שונו
      formData.append("existingPicture", episode.picture);
    }

    // לוג לבדיקה
    for (const [key, value] of formData.entries()) {
      console.log("📦 FormData:", key, value);
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

  return (
    <form onSubmit={handleSubmit} dir="rtl">
      <h2>{isEditMode ? "עדכון פרק" : "הוספת פרק חדש"}</h2>

      <label>כותרת:</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} required />

      <label>תוכן:</label>
      <textarea value={body} onChange={(e) => setBody(e.target.value)} required />

      <label>תמונה:</label>
      <input type="file" accept="image/*" onChange={(e) => setPicture(e.target.files[0])} />

      {error && <div style={{ color: "red" }}>{error}</div>}

      <button type="submit">{isEditMode ? "עדכן" : "שמור"}</button>
    </form>
  );
}
