// // components/layout/Framework.jsx
// import { Outlet, useNavigate } from "react-router-dom";
// import "../style/frameStyle.css";
// import { useEffect, useState } from "react";
// import { getCurrentUser } from "../db-api";

// export default function Framework() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   useEffect(() => {
//     const currUser = getCurrentUser();
//     setUser(currUser);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("currentUser");
//     localStorage.removeItem("token");
//     setUser(null);
//     navigate("/");
//   };

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   return (
//     <div className="main-container">
//       <div className="header-bar">
//         <img
//           src="/images/לוגו-סופי-לבן-2048x901.png"
//           alt="על המשמעות"
//           className="logo-header"
//         />

//         <div className="main-nav">
//           <nav className="home-nav">
//             <button onClick={() => {
//               navigate("/");
//               setTimeout(() => {
//                 const section = document.getElementById("about");
//                 section?.scrollIntoView({ behavior: "smooth" });
//               }, 100);
//             }}>אודות</button>

//             <button onClick={() => {
//               navigate("/");
//               setTimeout(() => {
//                 const section = document.getElementById("vision");
//                 section?.scrollIntoView({ behavior: "smooth" });
//               }, 100);
//             }}>חזון</button>

//             <button onClick={() => navigate("/contact")}>צור קשר</button>
//             <button onClick={() => navigate("/supporters")}>תומכים מובילים</button>
//             <button onClick={() => navigate("/interviews")}>ראיונות עתידיים</button>
//             <button onClick={() => navigate("/episodes")}>פרקי הפודקאסט</button>
//             {user?.userType === "מנהל" && (
//               <button onClick={() => navigate("/admin")}>🔐 ממשק ניהול</button>
//             )}
//           </nav>
//         </div>
// {/* 
//         <div className="profile-menu-container">
//           {user ? (
//             <div className={`profile-menu ${dropdownOpen ? "open" : ""}`}>
//               <img
//                 src={`http://localhost:8080/users/image/${user.profilePic}`}
//                 alt="פרופיל"
//                 className="profile-pic"
//                 onClick={toggleDropdown}
//               />
//               <span className="profile-name">{user.userName}</span>
//               <div className="dropdown">
//                 <button onClick={() => navigate("/messages")}>🔔 הודעות</button>
//                 <button onClick={() => navigate("/profile")}>🧍 פרופיל אישי</button>
//                 <button onClick={handleLogout}>🔓 התנתקות</button>
//               </div>
//             </div>
//           ) : (
//             <div className="profile-menu">
//               <img
//                 src="/images/profile-placeholder.png"
//                 alt="התחבר"
//                 className="profile-pic"
//                 onClick={() => navigate("/login")}
//               />
//               <span className="profile-name">התחברות</span>
//             </div>
//           )}
//         </div>
//       </div>

//       <Outlet />

//       <div className="social-links">
//         <a href="https://x.com/al_hamashmaut" target="_blank" rel="noreferrer">
//           <img src="/icons/x.png" alt="X" />
//         </a>
//         <a href="https://www.instagram.com/tamirdortal/" target="_blank" rel="noreferrer">
//           <img src="/icons/instagram.png" alt="Instagram" />
//         </a>
//         <a href="https://www.youtube.com/@alhamashmaut" target="_blank" rel="noreferrer">
//           <img src="/icons/youtube.png" alt="YouTube" />
//         </a>
//         <a href="#" title="ספוטיפיי (בקרוב)">
//           <img src="/icons/spotify.png" alt="Spotify" />
//         </a>
//       </div>
//     </div>
//   );
// } */}



import { Outlet, useNavigate } from "react-router-dom";
import "../style/frameStyle.css";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../db-api";

export default function Framework() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const currUser = getCurrentUser();
    setUser(currUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="main-container">
      <div className="header-bar">
        <img
          src="/images/לוגו-סופי-לבן-2048x901.png"
          alt="על המשמעות"
          className="logo-header"
        />

        <div className="menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav className="main-nav home-nav">
          <button onClick={() => navigate("/")}>אודות</button>
          <button onClick={() => navigate("/")}>חזון</button>
          <button onClick={() => navigate("/contact")}>צור קשר</button>
          <button onClick={() => navigate("/supporters")}>תומכים מובילים</button>
          <button onClick={() => navigate("/interviews")}>ראיונות עתידיים</button>
          <button onClick={() => navigate("/episodes")}>פרקי הפודקאסט</button>
          {user?.userType === "מנהל" && (
            <button onClick={() => navigate("/admin")}>🔐 ממשק ניהול</button>
          )}
        </nav>

        <div className="profile-menu-container">
          {user ? (
            <div className={`profile-menu ${dropdownOpen ? "open" : ""}`}>
              <img
                src={`http://localhost:8080/users/image/${user.profilePic}`}
                alt="פרופיל"
                className="profile-pic"
                onClick={toggleDropdown}
              />
              <span className="profile-name">{user.userName}</span>
              <div className="dropdown">
                <button onClick={() => navigate("/messages")}>🔔 הודעות</button>
                <button onClick={() => navigate("/profile")}>🧍 פרופיל אישי</button>
                <button onClick={handleLogout}>🔓 התנתקות</button>
              </div>
            </div>
          ) : (
            <div className="profile-menu">
              <img
                src="/images/profile-placeholder.png"
                alt="התחבר"
                className="profile-pic"
                onClick={() => navigate("/login")}
              />
              <span className="profile-name">התחברות</span>
            </div>
          )}
        </div>
      </div>

      {/* תפריט במובייל */}
      <div className={`mobile-nav ${mobileMenuOpen ? "show" : ""}`}>
        <button onClick={() => navigate("/")}>אודות</button>
        <button onClick={() => navigate("/")}>חזון</button>
        <button onClick={() => navigate("/contact")}>צור קשר</button>
        <button onClick={() => navigate("/supporters")}>תומכים מובילים</button>
        <button onClick={() => navigate("/interviews")}>ראיונות עתידיים</button>
        <button onClick={() => navigate("/episodes")}>פרקי הפודקאסט</button>
        {user?.userType === "מנהל" && (
          <button onClick={() => navigate("/admin")}>🔐 ממשק ניהול</button>
        )}
      </div>

      <Outlet />

      <div className="social-links">
        <a href="https://x.com/al_hamashmaut" target="_blank" rel="noreferrer">
          <img src="/icons/x.png" alt="X" />
        </a>
        <a href="https://www.instagram.com/tamirdortal/" target="_blank" rel="noreferrer">
          <img src="/icons/instagram.png" alt="Instagram" />
        </a>
        <a href="https://www.youtube.com/@alhamashmaut" target="_blank" rel="noreferrer">
          <img src="/icons/youtube.png" alt="YouTube" />
        </a>
        <a href="#" title="ספוטיפיי (בקרוב)">
          <img src="/icons/spotify.png" alt="Spotify" />
        </a>
      </div>
    </div>
  );
}
