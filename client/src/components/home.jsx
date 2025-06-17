// components/home.jsx
import "../style/homeStyle.css";

export default function Home() {
  return (
    <div>
      {/* אזור תוכן עוגנים – ייחודי לדף הבית */}
      <section id="vision" className="section">
        <h3>החזון שלנו הוא...</h3>
        <p>אנחנו מאמינים ביצירת שיח עמוק, ערכי וחקר משמעות.</p>
      </section>

      <section id="future-interviews" className="section">
        <h3>ראיונות עתידיים...</h3>
        <p>כאן יוצגו תכנים ומידע על המרואיינים הבאים.</p>
      </section>

      <section id="podcasts" className="section">
        <h3>הפודקאסטים שלנו...</h3>
        <p>פרקי הפודקאסט הכי מעוררי השראה במקום אחד.</p>
      </section>

      <div className="gallery">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="gallery-item">תמונה</div>
        ))}
      </div>
    </div>
  );
}


// export default Home; 
// import { useNavigate, Outlet } from "react-router-dom";
// import "../style/homeStyle.css";
// import { useEffect, useState } from "react";
// import { getCurrentUser } from "../db-api";

// const Home = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const currUser = getCurrentUser();
//     setUser(currUser);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("currentUser");
//     localStorage.removeItem("token");
//     setUser(null);
//     window.location.reload(); // רענון קל של הדף כדי לאפס את ה־context
//   };

//   return (
//     <div className="main-container">
//       {/* כפתור התחברות או התנתקות בצד ימין למעלה */}
//       <div className="top-bar">
//         {!user && (
//           <button onClick={() => navigate("/login")}>התחברות / הרשמה</button>
//         )}
//         {user && (
//           <button onClick={handleLogout}>התנתק</button>
//         )}
//       </div>

//       <h1 className="main-title">על המשמעות</h1>
//       {user && <h2 className="main-user-greeting">שלום {user.userName}!</h2>}

//       {/* תפריט ניווט */}
//       <div className="main-nav">
//         {/* <a href="#vision">חזון</a>|
//         <a href={`/${user?.userName}/${user?.id}/contact`}>צור קשר</a>|
//         <a href="/supporters">תומכים מובילים</a>|
//         <a href="/interviews">ראיונות עתידיים</a>|
//         <a href="/episodes">פודקאסטים שלנו</a> */}
//              <nav className="home-nav">
//         <button onClick={() => navigate("contact")}>צור קשר</button>
//         <button onClick={() => navigate("supporters")}>תומכים מובילים</button>
//         <button onClick={() => navigate("interviews")}>ראיונות עתידיים</button>
//         <button onClick={() => navigate("episodes")}>פרקי הפודקאסט</button>
  
//       </nav>
//       </div>

//       {/* אזור תוכן עוגנים */}
//       <section id="vision" className="section">
//         <h3>החזון שלנו הוא...</h3>
//         <p>...</p>
//       </section>

//       <section id="future-interviews" className="section">
//         <h3>ראיונות עתידיים...</h3>
//         {/* <button onClick={() => navigate(`/${user?.userName}/${user?.id}/interviews`)}> */}
//         <button onClick={() => navigate(`interviews`)}>

//           כפתור לדף ראיונות עתידיים
//         </button>
//       </section>

//       <section id="podcasts" className="section">
//         <h3>הפודקאסטים שלנו...</h3>
//         <button onClick={() => navigate(`/episodes`)}>
//         {/* <button onClick={() => navigate(`/${user?.userName}/${user?.id}/episodes`)}> */}

//           כפתור לדף פודקאסטים
//         </button>
//       </section>

//       <div className="gallery">
//         {[1, 2, 3, 4, 5, 6].map((n) => (
//           <div key={n} className="gallery-item">תמונה</div>
//         ))}
//       </div>

//       {/* רשתות חברתיות */}
//       <div className="social-links">
//         <a href="https://x.com/al_hamashmaut" target="_blank" rel="noreferrer">
//           <img src="/icons/x.svg" alt="X" />
//         </a>
//         <a href="https://www.instagram.com/tamirdortal/" target="_blank" rel="noreferrer">
//           <img src="/icons/instagram.svg" alt="Instagram" />
//         </a>
//         <a href="https://www.youtube.com/@alhamashmaut" target="_blank" rel="noreferrer">
//           <img src="/icons/youtube.svg" alt="YouTube" />
//         </a>
//         <a href="#" title="ספוטיפיי (בקרוב)">
//           <img src="/icons/spotify.svg" alt="Spotify" />
//         </a>
//       </div>

//       {/* כאן נטען תוכן דינמי לפי Route */}
//       <Outlet />
//     </div>
//   );
// };

// export default Home;
// import { useNavigate, Outlet } from "react-router-dom";
// import "../style/homeStyle.css";
// import { useEffect, useState } from "react";
// import { getCurrentUser } from "../db-api";

// const Home = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const currUser = getCurrentUser();
//     setUser(currUser);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("currentUser");
//     localStorage.removeItem("token");
//     setUser(null);
//     window.location.reload();
//   };

//   return (
//     <div className="main-container">
//       <div className="top-bar">
//         {!user && <button onClick={() => navigate("/login")}>התחברות / הרשמה</button>}
//         {user && <button onClick={handleLogout}>התנתק</button>}
//       </div>

//       <h1 className="main-title">על המשמעות</h1>
//       {user && <h2 className="main-user-greeting">שלום {user.userName}!</h2>}

//       <nav className="home-nav">
//         <button onClick={() => navigate("episodes")}>פרקי הפודקאסט</button>
//         <button onClick={() => navigate("interviews")}>ראיונות עתידיים</button>
//         <button onClick={() => navigate("supporters")}>תומכים מובילים</button>
//       </nav>

//       {/* תוכן קבוע בדף הבית */}
//       <section id="vision" className="section">
//         <h3>החזון שלנו הוא...</h3>
//         <p>...</p>
//       </section>

//       {/* תוכן מתחלף לפי Route */}
//       <Outlet />
//     </div>
//   );
// };

// export default Home;
