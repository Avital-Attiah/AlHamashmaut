// EpisodeForm.jsx
import React, { useEffect, useState } from 'react';
import { addData, getData, updateData } from '../../db-api';
import { useNavigate, useParams } from 'react-router-dom';

export default function addEditEpisode() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: '',
    body: '',
    picture: '',
    isFutureInterview: window.location.pathname.includes('future')
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode) {
      loadEpisode();
    }
  }, [id]);

  const loadEpisode = async () => {
    try {
      const episode = await getData(`episodes/${id}`);
      setFormData({
        title: episode.title || '',
        body: episode.body || '',
        picture: episode.picture || '',
        isFutureInterview: episode.isFutureInterview || false
      });
    } catch (err) {
      setError('שגיאה בטעינת פרק לעריכה');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isEditMode) {
        await updateData(`episodes/${id}`, formData);
      } else {
        await addData('episodes', formData);
      }
      navigate(-1); // חזרה לעמוד הקודם
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-container">
      <h2>{isEditMode ? 'עריכת פרק' : formData.isFutureInterview ? 'הוספת ראיון עתידי' : 'הוספת פרק חדש'}</h2>
      {error && <p className="error">שגיאה: {error}</p>}
      <form onSubmit={handleSubmit} className="episode-form">
        <label>כותרת:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />

        <label>תוכן:</label>
        <textarea name="body" value={formData.body} onChange={handleChange} required />

        <label>תמונה (קישור):</label>
        <input type="text" name="picture" value={formData.picture} onChange={handleChange} />

        <label>
          <input type="checkbox" name="isFutureInterview" checked={formData.isFutureInterview} onChange={handleChange} />
          האם זה ראיון עתידי?
        </label>

        <button type="submit">{isEditMode ? 'שמור שינויים' : 'שמור פרק'}</button>
      </form>
    </div>
  );
}
