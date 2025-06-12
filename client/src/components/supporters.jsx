import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../style/supportersStyle.css"; // Assuming you have a CSS file for styling
import React from "react";

const supportersData = [
  { id: 1, name: "אהרון דייזמן", text: "אהרון הוא..." },
  { id: 2, name: "תפארת סלומון-סדן", text: "תפארת היא..." },
  { id: 3, name: "אסף לכט", text: "אסף הוא..." },
  { id: 4, name: "יונתן קרמר", text: "יונתן הוא..." },
];

const Supporters = () => {
  const navigate = useNavigate();
  const [openSupporterId, setOpenSupporterId] = useState(null);

  const toggleSupporter = (id) => {
    setOpenSupporterId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="supporters-container">
      <h1 className="title">תומכים מובילים</h1>

      {/* סרגל ניווט מתחת לכותרת */}
      <div className="top-nav">
        <a href="/#vision">חזון</a>|
        <a href="/#contact">צור קשר</a>|
        <a href="/supporters">תומכים מובילים</a>|
        <a href="/#future-interviews">ראיונות עתידיים</a>|
        <a href="/#podcasts">פודקאסטים שלנו</a>
      </div>

      {/* כפתור חזרה לעמוד הבית */}
      <div className="back-button">
        <button onClick={() => navigate("/")}>חזרה לעמוד הבית</button>
      </div>

      {/* תצוגת תומכים */}
      <div className="supporters-list">
        {supportersData.map((s) => (
          <div key={s.id} className="supporter-card" onClick={() => toggleSupporter(s.id)}>
            <div className="supporter-image">תמונה</div>
            <div className="supporter-name">{s.name}</div>
            {openSupporterId === s.id && (
              <div className="supporter-text">{s.text}</div>
            )}
          </div>
        ))}
      </div>

      {/* תיאור המסלולים */}
      <div className="membership-description">
        <h2>הצטרפו ותמכו בפודקאסט המתפתח ביותר בישראל</h2>
        <div className="membership-plans">
          <div className="plan">
            <h3>מסלול 200₪</h3>
            <ul>
              <li>גישה למפגש זום שבועי עם תמרי והקהילה</li>
              <li>"על המשמעות+" גישה מלאה ליותר מ-600 פרקים בלעדיים לתומכים בלבד</li>
              <li>הזמנת מרואיינים ופודקאסטים מיוחדים</li>
              <li>השפעה על אילו פרקים יצאו קודם</li>
              <li>כניסה לקבוצת המתחזקים והשותפים והשפעה על קבלת החלטות</li>
            </ul>
            <a href="https://www.peach-in.com/cmp/roIbvgwn8?ref=EzJ12che&lang=he" target="_blank" rel="noreferrer">
              <button>בחירה</button>
            </a>
          </div>
          <div className="plan">
            <h3>מסלול 350₪</h3>
            <ul>
              <li>גישה למפגש זום שבועי עם תמרי והקהילה</li>
              <li>"על המשמעות+" גישה מלאה ליותר מ-600 פרקים בלעדיים לתומכים בלבד</li>
              <li>הזמנת מרואיינים ופודקאסטים מיוחדים</li>
              <li>השפעה על אילו פרקים יצאו קודם</li>
              <li>כניסה לקבוצת המתחזקים והשותפים והשפעה על קבלת החלטות</li>
              <li>השתתפות באריונות מאחורי הקלעים ומפגש עם מרואיינים אף דה קוד</li>
            </ul>
            <a href="https://www.peach-in.com/cmp/roIbvgwn8?ref=EzJ12che&lang=he" target="_blank" rel="noreferrer">
              <button>בחירה</button>
            </a>
          </div>
        </div>
      </div>

      {/* תיאור לתורמים מובילים */}
      <div className="leading-supporters-description">
        <p>
          הפודקאסט המוביל בישראל לשיח אינטלקטואלי עמוק ומשמעותי. זוכה מקום ראשון בתחרות גיקטיים לפודקאסטים עצמאיים,
          "על המשמעות" מציע מבט ייחודי על הנושאים החשובים ביותר בחברה הישראלית.
          עם מעל 500 פרקים איכותיים, ראיונות מרתקים עם מובילי דעה, ו-1.8 מיליון האזנות,
          אנו מזמינים אתכם להצטרף לקהילת המאזינים שלנו. הצטרפו היום וקחו חלק בעיצוב השיח הציבורי בישראל.
        </p>
      </div>

      {/* כפתור הפכו לתורמים מובילים */}
      <div className="action-buttons">
        <a href="https://api.whatsapp.com/send/?phone=972542690897&text&type=phone_number&app_absent=0" target="_blank" rel="noreferrer">
          <button>הפכו לתורמים מובילים</button>
        </a>
      </div>
      <div className="social-links">
  <a href="https://x.com/al_hamashmaut" target="_blank" rel="noreferrer">
    <img src="/icons/x.svg" alt="X" />
  </a>
  <a href="https://www.instagram.com/tamirdortal/" target="_blank" rel="noreferrer">
    <img src="/icons/instagram.svg" alt="Instagram" />
  </a>
  <a href="https://www.youtube.com/@alhamashmaut" target="_blank" rel="noreferrer">
    <img src="/icons/youtube.svg" alt="YouTube" />
  </a>
  <a href="#" title="ספוטיפיי (בקרוב)">
    <img src="/icons/spotify.svg" alt="Spotify" />
  </a>
</div>
    </div>
    
    
  );
};

export default Supporters;
