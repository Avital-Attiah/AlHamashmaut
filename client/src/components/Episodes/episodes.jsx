
// import { useState, useEffect } from 'react';
// import Episode from './episode.jsx';
// import { getData } from '../../db-api';

// export default function Episodes({ showFuture }) {
//   const [episodes, setEpisodes] = useState([]);
//   // const [showFuture, setShowFuture] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchEpisodes = async () => {
//       try {
//         const data = await getData(`episodes?isFutureInterview=${showFuture}`);
//         setEpisodes(data);
//         setError(null);
//       } catch (err) {
//         setError('שגיאה בטעינת הפרקים');
//       }
//     };

//     fetchEpisodes();
//   }, [showFuture]);

//   return (
//     <div className="podcasts-page">


//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {!error && episodes.length === 0 && (
//         <p style={{ color: 'gray' }}>לא נמצאו פרקים להצגה</p>
//       )}
//       <div className="episode-list">
//         {episodes.map((ep) => (
//           <Episode key={ep.id} episode={ep} />
//         ))}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import Episode from './episode.jsx';
import { getData } from '../../db-api';

export default function Episodes({ showFuture }) {
  const [episodes, setEpisodes] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const limit = 3;

  useEffect(() => {
    setEpisodes([]);
    setPage(0);
    setTotal(0);
    fetchMoreEpisodes(0);
  }, [showFuture]);

  const fetchMoreEpisodes = async (pageNum) => {
    try {
      const offset = pageNum * limit;
      const res = await getData(`episodes?isFutureInterview=${showFuture}&limit=${limit}&offset=${offset}`);
      const newEpisodes = res.episodes || [];
      const totalCount = res.total || 0;

      if (newEpisodes.length > 0) {
        setEpisodes((prev) => [...prev, ...newEpisodes]);
        setPage(pageNum);
        setTotal(totalCount);
      }
    } catch (err) {
      setError('שגיאה בטעינת הפרקים');
    }
  };

  const handleLoadMore = () => {
    fetchMoreEpisodes(page + 1);
  };

  return (
    <div className="podcasts-page" dir="rtl" style={{ padding: '1rem' }}>
      <h2>{showFuture ? "ראיונות עתידיים" : "פרקים שפורסמו"}</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!error && episodes.length === 0 && (
        <p style={{ color: 'gray' }}>לא נמצאו פרקים להצגה</p>
      )}

      <div className="episode-list">
        {episodes.map((ep) => (
          <Episode key={ep.id} episode={ep} />
        ))}
      </div>

      {episodes.length < total && (
        <button
          onClick={handleLoadMore}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#0077cc',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          הצג עוד
        </button>
      )}
    </div>
  );
}

