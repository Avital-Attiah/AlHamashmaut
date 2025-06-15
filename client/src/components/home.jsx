// // import { useNavigate, Outlet } from "react-router-dom";
// // import "../style/homeStyle.css";
// // import { useEffect, useState } from "react";
// // import { getCurrentUser } from "../db-api";

// // const Home = () => {
// //   const navigate = useNavigate();
// //   const [user, setUser] =useState(null);
// // setUser(getCurrentUser());

// //   const handleLogout = () => {
// //   localStorage.removeItem("currentUser");
// //   setUser(null);
// //   localStorage.removeItem("token");
// //   window.location.reload(); // רענון קל של הדף כדי לאפס את ה־context
// // };


// // return (
// //   <div className="main-container">
// //     {/* כפתור התחברות או התנתקות בצד ימין למעלה */}
// //     <div className="top-bar">
// //       {!user && (
// //         <button onClick={() => navigate("/login")}>התחברות / הרשמה</button>
// //       )}
// //       {user && (
// //         <button onClick={handleLogout}>התנתק</button>
// //       )}
// //     </div>
// //     <h1 className="main-title">על המשמעות</h1>

// //     {user && <h2 className="main-user-greeting">שלום {user.userName}!</h2>}

// //       {/* תפריט ניווט */}
// //       <div className="main-nav">
// //         <a href="#vision">חזון</a>|
// //         <a href={`/${user?.userName}/${user?.id}/contact`}>צור קשר</a>|
// //         <a href="/supporters">תומכים מובילים</a>|
// //         <a href="#future-interviews">ראיונות עתידיים</a>|
// //         <a href="#podcasts">פודקאסטים שלנו</a>
// //       </div>

// //       {/* אזור תוכן עוגנים */}
// //       <section id="vision" className="section">
// //         <h3>החזון שלנו הוא...</h3>
// //         <p>...</p>
// //       </section>

// //       <section id="future-interviews" className="section">
// //         <h3>ראיונות עתידיים...</h3>
// //         <button onClick={() => navigate(`/${user?.userName}/${user?.id}/interviews`)}>
// //           כפתור לדף ראיונות עתידיים
// //         </button>
// //       </section>

// //       <section id="podcasts" className="section">
// //         <h3>הפודקאסטים שלנו...</h3>
// //         <button onClick={() => navigate(`/${user?.userName}/${user?.id}/episodes`)}>
// //           כפתור לדף פודקאסטים
// //         </button>
// //       </section>

// //       <div className="gallery">
// //         {[1, 2, 3, 4, 5, 6].map((n) => (
// //           <div key={n} className="gallery-item">תמונה</div>
// //         ))}
// //       </div>
// // {/* רשתות חברתיות */}
// // <div className="social-links">
// //   <a href="https://x.com/al_hamashmaut" target="_blank" rel="noreferrer">
// //     <img src="/icons/x.svg" alt="X" />
// //   </a>
// //   <a href="https://www.instagram.com/tamirdortal/" target="_blank" rel="noreferrer">
// //     <img src="/icons/instagram.svg" alt="Instagram" />
// //   </a>
// //   <a href="https://www.youtube.com/@alhamashmaut" target="_blank" rel="noreferrer">
// //     <img src="/icons/youtube.svg" alt="YouTube" />
// //   </a>
// //   <a href="#" title="ספוטיפיי (בקרוב)">
// //     <img src="/icons/spotify.svg" alt="Spotify" />
// //   </a>
// // </div>

// //       {/* כאן נטען תוכן דינמי לפי Route */}
// //       <Outlet />
// //     </div>
// //   );
// // };

// // export default Home;





// // // import { useEffect, useState } from "react"; 
// // // import { useNavigate, Outlet } from "react-router-dom"; 
// // // import "../style/homeStyle.css"; 
// // // import { useUser } from "../UserContext";

// // // const Home = () => {

// // //   const { user } = useUser();
// // //   console.log("user from context:", user);

// // //  // const [user, setUser] = useState(null); // הגדרת מצב למשתמש
// // //   const navigate = useNavigate(); 
 
  

// // //   const handleLogout = () => {
// // //     localStorage.removeItem("user"); // הסרת המידע על המשתמש מ-localStorage
// // //     navigate("/login"); 
// // //   };

// // //   return (
// // //     <div className="home-container">
// // //       <h1 className="home-title">עמוד הבית</h1>
// // //       {user && <h2 className="home-user-greeting">שלום {user.username}!</h2>} {/* הצגת ברכת שלום אם המשתמש קיים */}

// // //       {/* כפתורי ניווט */}
// // //       <div className="navigation">
// // //         <button className="nav-link" onClick={() => navigate(`/${user?.username}/${user?.id}/info`)}>Info</button>
// // //         <button className="nav-link" onClick={() => navigate(`/${user?.username}/${user?.id}/todos`)}>Todos</button>
// // //         <button className="nav-link" onClick={() => navigate(`/${user?.username}/${user?.id}/posts`)}>Posts</button>
// // //         <button className="logout-button" onClick={handleLogout}>Logout</button>
// // //       </div>

// // //       {/* אזור התוכן המוצג */}
// // //       <Outlet />
// // //     </div>
// // //   );
// // // };

// // // export default Home; 
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
import { useNavigate, Outlet } from "react-router-dom";
import "../style/homeStyle.css";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../db-api";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currUser = getCurrentUser();
    setUser(currUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload();
  };

  return (
    <div className="main-container">
      <div className="top-bar">
        {!user && <button onClick={() => navigate("/login")}>התחברות / הרשמה</button>}
        {user && <button onClick={handleLogout}>התנתק</button>}
      </div>

      <h1 className="main-title">על המשמעות</h1>
      {user && <h2 className="main-user-greeting">שלום {user.userName}!</h2>}

      <nav className="home-nav">
        <button onClick={() => navigate("episodes")}>פרקי הפודקאסט</button>
        <button onClick={() => navigate("interviews")}>ראיונות עתידיים</button>
        <button onClick={() => navigate("supporters")}>תומכים מובילים</button>
      </nav>

      {/* תוכן קבוע בדף הבית */}
      <section id="vision" className="section">
        <h3>החזון שלנו הוא...</h3>
        <p>...</p>
      </section>

      {/* תוכן מתחלף לפי Route */}
      <Outlet />
    </div>
  );
};

export default Home;
