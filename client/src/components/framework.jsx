
import { Outlet, useNavigate } from "react-router-dom";
import "../style/frameStyle.css";
import Login from "./Entry/logIn.jsx";
import { useEffect, useState } from "react";
import { getCurrentUser, getData } from "../db-api";
import { useModal } from "../AppContext.jsx";

export default function Framework() {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openModal } = useModal();

  const fetchUnread = async () => {
    try {
      const res = await getData("messages/unread-count");
      setUnreadCount(res.count);
    } catch (err) {
      console.error("שגיאה בספירת הודעות שלא נקראו:", err);
    }
  };

  useEffect(() => {
    const currUser = getCurrentUser();
    setUser(currUser);
    if (currUser) fetchUnread();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (user) fetchUnread();
    }, 10000); // כל 10 שניות
    return () => clearInterval(interval);
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
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
          <span></span><span></span><span></span>
        </div>

        <nav className="main-nav home-nav">
          <button onClick={() => navigate("/")}>אודות</button>
          
          <button onClick={() => navigate("/contact")}>צור קשר</button>
          <button onClick={() => navigate("/supporters")}>תומכים</button>
          <button onClick={() => navigate("/interviews")}>ראיונות עתידיים</button>
          <button onClick={() => navigate("/episodes")}>פרקי הפודקאסט</button>
          {user?.userType === "מנהל" && (
            <button onClick={() => navigate("/admin")}>🔐 ממשק ניהול</button>
          )}
        </nav>

        <div className="profile-menu-container">
          {user ? (
            <div className={`profile-menu ${dropdownOpen ? "open" : ""}`}>
              <div className="avatar-container" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <img
                  src={`http://localhost:8080/users/image/${user.profilePic}`}
                  alt="פרופיל"
                  className="profile-pic"
                />
                {unreadCount > 0 && (
                  <span className="unread-count">{unreadCount}</span>
                )}
              </div>
              <span className="profile-name">{user.userName}</span>

              {dropdownOpen && (
                <div className="dropdown">
                  <button onClick={() => navigate("/messages")}>🔔 הודעות</button>
                  <button onClick={() => navigate("/profile")}>🧍 פרופיל</button>
                  <button onClick={handleLogout}>🔓 התנתקות</button>
                </div>
              )}
            </div>
          ) : (
            <div className="profile-menu">
              <img
                src="/images/profile-placeholder.png"
                alt="התחבר"
                className="profile-pic"
                onClick={() => openModal(<Login />, "/login")}
              />
              <span className="profile-name">התחברות</span>
            </div>
          )}
        </div>
      </div>

      <div className={`mobile-nav ${mobileMenuOpen ? "show" : ""}`}>
        <button onClick={() => navigate("/")}>אודות</button>
        <button onClick={() => navigate("/")}>חזון</button>
        <button onClick={() => navigate("/contact")}>צור קשר</button>
        <button onClick={() => navigate("/supporters")}>תומכים</button>
        <button onClick={() => navigate("/interviews")}>ראיונות</button>
        <button onClick={() => navigate("/episodes")}>פרקים</button>
        {user?.userType === "מנהל" && (
          <button onClick={() => navigate("/admin")}>🔐 ניהול</button>
        )}
      </div>

      <div className="page-content">
        <Outlet context={{ refreshUnread: fetchUnread }} />
      </div>

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
