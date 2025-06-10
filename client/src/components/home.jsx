import { useNavigate, Outlet } from "react-router-dom";
import { useUser } from "../UserContext";
import "../style/homeStyle.css";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

return (
  <div className="main-container">
    {/* כפתור התחברות או התנתקות בצד ימין למעלה */}
    <div className="top-bar">
      {!user && (
        <button onClick={() => navigate("/login")}>התחברות / הרשמה</button>
      )}
      {user && (
        <button onClick={handleLogout}>התנתק</button>
      )}
    </div>
    <h1 className="main-title">על המשמעות</h1>

    {user && <h2 className="main-user-greeting">שלום {user.userName}!</h2>}

      {/* תפריט ניווט */}
      <div className="main-nav">
        <a href="#vision">חזון</a>|
        <a href={`/${user?.userName}/${user?.id}/contact`}>צור קשר</a>|
        <a href={`/${user?.userName}/${user?.id}/supporters`}>תומכים מובילים</a>|
        <a href="#future-interviews">ראיונות עתידיים</a>|
        <a href="#podcasts">פודקאסטים שלנו</a>
      </div>

      {/* אזור תוכן עוגנים */}
      <section id="vision" className="section">
        <h3>החזון שלנו הוא...</h3>
        <p>...</p>
      </section>

      <section id="future-interviews" className="section">
        <h3>ראיונות עתידיים...</h3>
        <button onClick={() => navigate(`/${user?.userName}/${user?.id}/interviews`)}>
          כפתור לדף ראיונות עתידיים
        </button>
      </section>

      <section id="podcasts" className="section">
        <h3>הפודקאסטים שלנו...</h3>
        <button onClick={() => navigate(`/${user?.userName}/${user?.id}/podcasts`)}>
          כפתור לדף פודקאסטים
        </button>
      </section>

      <div className="gallery">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="gallery-item">תמונה</div>
        ))}
      </div>

      
     

      {/* כאן נטען תוכן דינמי לפי Route */}
      <Outlet />
    </div>
  );
};

export default Home;





// import { useEffect, useState } from "react"; 
// import { useNavigate, Outlet } from "react-router-dom"; 
// import "../style/homeStyle.css"; 
// import { useUser } from "../UserContext";

// const Home = () => {

//   const { user } = useUser();
//   console.log("user from context:", user);

//  // const [user, setUser] = useState(null); // הגדרת מצב למשתמש
//   const navigate = useNavigate(); 
 
  

//   const handleLogout = () => {
//     localStorage.removeItem("user"); // הסרת המידע על המשתמש מ-localStorage
//     navigate("/login"); 
//   };

//   return (
//     <div className="home-container">
//       <h1 className="home-title">עמוד הבית</h1>
//       {user && <h2 className="home-user-greeting">שלום {user.username}!</h2>} {/* הצגת ברכת שלום אם המשתמש קיים */}

//       {/* כפתורי ניווט */}
//       <div className="navigation">
//         <button className="nav-link" onClick={() => navigate(`/${user?.username}/${user?.id}/info`)}>Info</button>
//         <button className="nav-link" onClick={() => navigate(`/${user?.username}/${user?.id}/todos`)}>Todos</button>
//         <button className="nav-link" onClick={() => navigate(`/${user?.username}/${user?.id}/posts`)}>Posts</button>
//         <button className="logout-button" onClick={handleLogout}>Logout</button>
//       </div>

//       {/* אזור התוכן המוצג */}
//       <Outlet />
//     </div>
//   );
// };

// export default Home; 
