import React, { useState, useEffect } from 'react';
import Episode from './episode.jsx';
import EpisodeDetails from './episodeDetails.jsx';
import { getData } from '../../db-api';
import '../../style/allEpisodesStyle.css';

export default function EpisodesPage({ showFuture = false }) {
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const limit = 6;

  useEffect(() => {
    // אתחול רשימה במעבר בין פרקי עבר לעתיד
    setEpisodes([]);
    setPage(0);
    setTotal(0);
    fetchEpisodes(0);
  }, [showFuture]);

  const fetchEpisodes = async (pageNum) => {
    try {
      const offset = pageNum * limit;
      const res = await getData(`episodes?isFutureInterview=${showFuture}&limit=${limit}&offset=${offset}`);
      const newEpisodes = res.episodes || [];
      const totalCount = res.total || 0;

      setEpisodes((prev) => pageNum === 0 ? newEpisodes : [...prev, ...newEpisodes]);
      setPage(pageNum);
      setTotal(totalCount);
    } catch (err) {
      setError("שגיאה בטעינת הפרקים");
    }
  };

  const handleLoadMore = () => {
    fetchEpisodes(page + 1);
  };

  const handleSelectEpisode = (ep) => {
    setSelectedEpisode(ep);
  };

  const closeDetails = () => {
    setSelectedEpisode(null);
  };

  const filteredEpisodes = episodes.filter((ep) =>
    (ep.title && ep.title.toLowerCase().includes(search.toLowerCase())) ||
    (ep.body && ep.body.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className={`podcasts-page ${selectedEpisode ? "show-single" : ""}`} dir="rtl">
      {!selectedEpisode && (
        <>
          <h2 style={{ textAlign: "center" }}>{showFuture ? "ראיונות עתידיים" : "פרקים שפורסמו"}</h2>
          <input
            className="search-bar"
            placeholder="חפש"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {selectedEpisode ? (
        <>
          <div className="episode-main">
            <EpisodeDetails episode={selectedEpisode} onClose={closeDetails} />
          </div>
          <div className="episode-list episode-sidebar">
            {episodes.map((ep) => (
              <Episode key={ep.id} episode={ep} onClick={() => handleSelectEpisode(ep)} />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="episode-list">
            {filteredEpisodes.length > 0 ? (
              filteredEpisodes.map((ep) => (
                <Episode key={ep.id} episode={ep} onClick={() => handleSelectEpisode(ep)} />
              ))
            ) : (
              <p style={{ textAlign: "center", marginTop: "2rem" }}>
                לא נמצאו תוצאות לחיפוש "{search}"
              </p>
            )}
          </div>
          {episodes.length < total && (
            <button className="load-more" onClick={handleLoadMore}>
              הצג עוד
            </button>
          )}
        </>
      )}
    </div>
  );
}
