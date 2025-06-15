import React, { useState, useEffect } from 'react';
import Episode from './episode.jsx';
import EpisodeDetails from './episodeDetails.jsx';
import { getData } from '../../db-api';

export default function episodes() {
  const [episodes, setEpisodes] = useState([]);
  const [showFuture, setShowFuture] = useState(false); // false => רק שפורסמו, true => עתידיים
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const data = await getData(`episodes/${showFuture}`);
        setEpisodes(data);
        setError(null);
      } catch (err) {
        setError('שגיאה בטעינת הפרקים');
      }
    };

    fetchEpisodes();
  }, [showFuture]);

  const handleSelectEpisode = (episode) => {
    setSelectedEpisode(episode);
  };

  const closeDetails = () => {
    setSelectedEpisode(null);
  };

  return (
    <div className="podcasts-page">
      <h1>פודקאסטים</h1>

      <div className="toggle-buttons">
        <button
          onClick={() => setShowFuture(false)}
          className={!showFuture ? 'active' : ''}
        >
          פרקים שפורסמו
        </button>
        <button
          onClick={() => setShowFuture(true)}
          className={showFuture ? 'active' : ''}
        >
          ראיונות עתידיים
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="episode-list">
        {episodes.map((ep) => (
          <Episode key={ep.id} episode={ep} onSelect={handleSelectEpisode} />
        ))}
      </div>

      {selectedEpisode && (
        <div className="episode-modal">
          <div className="modal-overlay" onClick={closeDetails}></div>
          <div className="modal-content">
            <EpisodeDetails episode={selectedEpisode} onClose={closeDetails} />
          </div>
        </div>
      )}
    </div>
  );
}
