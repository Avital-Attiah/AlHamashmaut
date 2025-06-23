// components/layout/Framework.jsx
import { Outlet, useNavigate } from "react-router-dom";
//import "../style/homeStyle.css";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../db-api";

export default function Framework() {
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
    navigate("/");
  };

  return (
    <div className="main-container">
      <div className="top-bar">
        {!user && <button onClick={() => navigate("/login")}>התחברות / הרשמה</button>}
        {user && <button onClick={handleLogout}>התנתק</button>}
      </div>

      <h1 className="main-title">על המשמעות</h1>
      {user && <h2 className="main-user-greeting">שלום {user.userName}!</h2>}

      <div className="main-nav">
        <nav className="home-nav">
          <button onClick={() => {
            navigate("/");
            setTimeout(() => {
              const section = document.getElementById("about");
              section?.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }}>אודות</button>

          <button onClick={() => {
            navigate("/"); // ודאי שאת בדף הבית
            setTimeout(() => {
              const section = document.getElementById("vision");
              section?.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }}>חזון</button>

          <button onClick={() => navigate("contact")}>צור קשר</button>
          <button onClick={() => navigate("supporters")}>תומכים מובילים</button>
          <button onClick={() => navigate("interviews")}>ראיונות עתידיים</button>
          <button onClick={() => navigate("episodes")}>פרקי הפודקאסט</button>
          {user?.userType === "מנהל" && (
            <button onClick={() => navigate("/admin")}>🔐 ממשק ניהול</button>
          )}


        </nav>
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
