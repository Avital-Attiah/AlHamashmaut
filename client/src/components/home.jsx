import "../style/homeStyle.css";

export default function Home() {
  return (
    <div className="home-container">
      {/* מבוא אישי */}
      <section id="about" className="section">
        <h3>מי אני?</h3>
        <p>
          שמי תמר דורטל, עורך דין ומחנך לשעבר, כיום יוצר הפודקאסט "על המשמעות". גדלתי כחילוני, חזרתי בתשובה מתוך מסע חיפוש, והיום אני מוביל קהילה פעילה של מאזינים ומתנדבים. 
          הפודקאסט נולד מתוך צורך אישי – למצוא תוכן עמוק באמת. מאז הפכנו למובילי שיח משמעותי בישראל, עם מעל 700 פרקים ו-14 מיליון האזנות.
        </p>
      </section>

      {/* החזון */}
      <section id="vision" className="section">
        <h3>החזון שלנו</h3>
        <p>
          ליצור מרחב להעמקה רעיונית, לברר סוגיות של זהות, מוסר, כלכלה ויהדות – ולעשות זאת בשפה בהירה ונגישה, בלי לוותר על העומק.
        </p>
      </section>

      {/* מה תמצאו כאן */}
      <section id="content-overview" className="section">
        <h3>מה תמצאו כאן?</h3>
        <ul>
          <li>🎧 מאות פרקים עם מרואיינים מהשורה הראשונה</li>
          <li>🧠 רעיונות פילוסופיים, כלכליים וערכיים</li>
          <li>🎤 ראיונות מיוחדים עם אנשי רוח, חוקרים, אנשי צבא ועוד</li>
          <li>📚 מאמרים, פרשנויות ותובנות</li>
          <li>🙋‍♀️ קהילה חיה שתומכת ולוקחת חלק</li>
        </ul>
      </section>

      {/* קריאה להצטרפות */}
      <section className="section join-us">
        <h3>הצטרפו לקהילת המשמעות</h3>
        <p>כאן יוצרים יחד שיח עמוק – לחצו והיו חלק מהשינוי התרבותי בישראל.</p>
        <button onClick={() => window.location.href = "https://www.peach-in.com/cmp/roIbvgwn8?lang=he"}>להצטרפות</button>
      </section>

      {/* גלריה */}
      <section id="gallery" className="section">
        <h3>חלק מהנושאים שנדבר עליהם:</h3>
        <div className="gallery">
         {[1, 2, 3, 4, 5, 6, 7].map((n) => (
         <img
           key={n}
          className="gallery-item"
          src={`/images/home${n}.png`}
          alt={`תמונה ${n}`}
        />
      ))}
     </div>

      </section>
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
