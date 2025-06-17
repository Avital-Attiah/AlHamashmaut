
import { useState, useEffect } from 'react';
import Episode from './episode.jsx';
import { getData } from '../../db-api';

export default function Episodes({ showFuture }) {
  const [episodes, setEpisodes] = useState([]);
  // const [showFuture, setShowFuture] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const data = await getData(`episodes?isFutureInterview=${showFuture}`);
        setEpisodes(data);
        setError(null);
      } catch (err) {
        setError('שגיאה בטעינת הפרקים');
      }
    };

    fetchEpisodes();
  }, [showFuture]);

  return (
    <div className="podcasts-page">


      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!error && episodes.length === 0 && (
        <p style={{ color: 'gray' }}>לא נמצאו פרקים להצגה</p>
      )}
      <div className="episode-list">
        {episodes.map((ep) => (
          <Episode key={ep.id} episode={ep} />
        ))}
      </div>
    </div>
  );
}

