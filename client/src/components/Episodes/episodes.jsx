
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
import { useNavigate } from 'react-router-dom';
import Episode from './episode.jsx';
import { getData } from '../../db-api';

export default function Episodes({ showFuture }) {
  const [episodes, setEpisodes] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  // const handleAddEpisode = () => {
  //  navigate(`/episode/new`, { state: {  } });// הנתיב שאליו מוביל כפתור ההוספה
  // };

  return (
    <div className="podcasts-page" dir="rtl" style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>{showFuture ? "ראיונות עתידיים" : "פרקים שפורסמו"}</h2>
        {/* <button
          onClick={handleAddEpisode}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#0077cc',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          ➕ הוסף פרק
        </button> */}
      </div>

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
