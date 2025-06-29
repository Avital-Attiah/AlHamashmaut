import React, { useEffect, useState } from "react";
import { addData, getData, updateData } from "../../db-api";
import { useNavigate, useParams, useLocation } from "react-router-dom";

export default function AddEditEpisode() {
  const { id } = useParams();
  const { state } = useLocation();
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    picture: "",
    isFutureInterview: false,
    spotifyLink: "",
    appleLink: "",
    soundcloudLink: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode && state?.episode) {
      setFormData(state.episode);
    }
  }, [id, state]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const payload = { ...formData };

      // רק כאשר מוסיפים פרק חדש – שייך את הפרק למנהל המחובר
      if (!isEditMode) {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (!currentUser || !currentUser.id) {
          setError("לא נמצא משתמש מחובר כדי לשייך את הפרק");
          return;
        }
        payload.adminId = currentUser.id;
      }

      if (isEditMode) {
        await updateData(`episodes/${id}`, payload);
      } else {
        await addData("episodes", payload);
      }
      navigate(-1);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-section">
      <div className="page-container">
        <h2>{isEditMode ? "עריכת פרק" : "הוספת פרק חדש"}</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input name="title" value={formData.title} onChange={handleChange} placeholder="כותרת" required />
          <textarea name="body" value={formData.body} onChange={handleChange} placeholder="תיאור" required />
          <input name="picture" value={formData.picture} onChange={handleChange} placeholder="שם תמונה" />
          <label>
            <input
              type="checkbox"
              name="isFutureInterview"
              checked={formData.isFutureInterview}
              onChange={handleChange}
            />
            זה ראיון עתידי
          </label>
          <input name="spotifyLink" value={formData.spotifyLink} onChange={handleChange} placeholder="קישור Spotify" />
          <input name="appleLink" value={formData.appleLink} onChange={handleChange} placeholder="קישור Apple" />
          <input name="soundcloudLink" value={formData.soundcloudLink} onChange={handleChange} placeholder="קישור SoundCloud" />
          <button type="submit">{isEditMode ? "שמור שינויים" : "הוסף פרק"}</button>
        </form>
      </div>
    </div>
  );
}
