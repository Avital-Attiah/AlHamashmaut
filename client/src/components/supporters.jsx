import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../style/supportersStyle.css";
import React from "react";

const supportersData = [
  {
    id: 1,
    name: "אהרון דייזמן",
    text: "אהרון הוא מנהל קהילות אזורי באחוות תורה, עבד כמרכז פרוייקטים באגודה אחת ובעמותת עלם",
    Image: "/images/support1.png"
  },
  {
    id: 2,
    name: "תפארת סלומון-סדן",
    text: "תפארת היא מנהלת קהילות אזורית באחוות תורה, עוסקת בהדרכת נוער ומובילה פרויקטים חברתיים",
    Image: "/images/support2.png"
  },
  {
    id: 3,
    name: "אסף לכט",
    text: "אסף הוא תורם ומוביל דעת קהל",
    Image: "/images/support3.png"
  },
  {
    id: 4,
    name: "יונתן קרמר",
    text: "יונתן תורם לפודקאסט, אחראי על פיתוח ותחזוקת האתר והרשתות החברתיות",
    Image: "/images/support4.png"
  },
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
    <section id="space2" ></section>
      <div className="supporters-list">
        {supportersData.map((s, index) => (
          <div
            key={s.id}
            className={`supporter-flip-card ${openSupporterId === s.id ? "flipped" : ""}`}
            style={{ '--i': index }}
            onClick={() => toggleSupporter(s.id)}
          >
            <div className="supporter-flip-inner">
              <div className="supporter-front">
                <img className="supporter-image" src={s.Image} alt={s.name} />
                <div className="supporter-name">{s.name}</div>
              </div>
              <div className="supporter-back">
                <h3>{s.name}</h3>
                <p>{s.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="membership-description">
        <h2>הצטרפו ותמכו בפודקאסט המתפתח ביותר בישראל</h2>
        <div className="membership-plans">
          <div className="plan">
            <h3>מסלול 200₪</h3>
            <ul>
              <li>גישה למפגש זום שבועי עם תמרי והקהילה</li>
              <li>"על המשמעות+" גישה מלאה ליותר מ-600 פרקים בלעדיים</li>
              <li>הזמנת מרואיינים ופודקאסטים מיוחדים</li>
              <li>השפעה על אילו פרקים יצאו קודם</li>
              <li>כניסה לקבוצת המתחזקים והשותפים</li>
            </ul>
            <a href="https://www.peach-in.com/cmp/roIbvgwn8?ref=EzJ12che&lang=he" target="_blank" rel="noreferrer">
              <button>בחירה</button>
            </a>
          </div>
          <div className="plan">
            <h3>מסלול 350₪</h3>
            <ul>
              <li>כולל את כל מה שב-200₪</li>
              <li>השתתפות בראיונות מאחורי הקלעים</li>
              <li>מפגש עם מרואיינים אף דה קוד</li>
            </ul>
            <a href="https://www.peach-in.com/cmp/roIbvgwn8?ref=EzJ12che&lang=he" target="_blank" rel="noreferrer">
              <button>בחירה</button>
            </a>
          </div>
        </div>
      </div>

      <div className="leading-supporters-description">
        <p>
          הפודקאסט המוביל בישראל לשיח אינטלקטואלי עמוק ומשמעותי. זוכה מקום ראשון בתחרות גיקטיים,
          עם מעל 500 פרקים איכותיים ו-1.8 מיליון האזנות. הצטרפו לקהילת המאזינים שלנו והשפיעו על השיח הציבורי בישראל.
        </p>
      </div>

      <div className="action-buttons">
        <a href="https://api.whatsapp.com/send/?phone=972542690897&text&type=phone_number&app_absent=0" target="_blank" rel="noreferrer">
          <button>הפכו לתורמים מובילים</button>
        </a>
      </div>
    </div>
  );
};

export default Supporters;
