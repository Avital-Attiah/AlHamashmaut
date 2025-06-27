

import "../style/homeStyle.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [count1, setCount1] = useState(0); // +14M
  const [count2, setCount2] = useState(0); // +700
  const [count3, setCount3] = useState(0); // +1.5M

  // רקע מתחלף
  const [bgIndex, setBgIndex] = useState(0);
  const heroImages =  [
  "PP3.jpeg",
  "PP4.jpeg",
  "PP5.jpeg",
  "PP7.jpeg",
  "PP8.jpeg",
  "PP9.jpeg",
  "PP!.jpeg",
  "PP2.jpeg"
];
  useEffect(() => {
    const sections = document.querySelectorAll(".section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.2 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // אנימציה של המספרים
  useEffect(() => {
    const interval1 = setInterval(() => {
      setCount1((prev) => (prev < 14 ? prev + 1 : prev));
      setCount2((prev) => (prev < 700 ? prev + 10 : prev));
      setCount3((prev) => (prev < 1.5 ? +(prev + 0.05).toFixed(2) : prev));
    }, 50);
    return () => clearInterval(interval1);
  }, []);

  // רקע מתחלף
  useEffect(() => {
    const bgTimer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % heroImages.length);
    }, 1000);
    return () => clearInterval(bgTimer);
  }, []);


  return (
    <div className="home-container">
      {/* HERO section */}
     {/* <section id="space" className="section">
      
      </section> */}
      <section className="hero-section">
        <img src={`http://localhost:8080/pic/${heroImages[bgIndex]}`} alt="background" className="hero-background" />
        <div className="hero-overlay">
          <h1 className="hero-title">על המשמעות+</h1>
          <p className="hero-sub">מפגש עומק שבועי עם תמיר דורטל</p>
          <div className="hero-stats">
            <div><span>+{count1}M</span><p>האזנות</p></div>
            <div><span>+{count2}</span><p>פרקים</p></div>
            <div><span>+{count3}M</span><p>האזנות בחודש</p></div>
          </div>
          <button className="hero-button" onClick={() => window.location.href = "https://www.peach-in.com/cmp/roIbvgwn8?lang=he"}>אני רוצה להצטרף</button>
        </div>
      </section>
      
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
        <button className="glow-button" onClick={() => window.location.href = "https://www.peach-in.com/cmp/roIbvgwn8?lang=he"}>
          להצטרפות
        </button>
      </section>

      {/* גלריה */}
      <section id="gallery" className="section">
        <h3>חלק מהנושאים שנדבר עליהם:</h3>
        <div className="gallery">
          {[1, 2, 3, 4, 5, 6, 7].map((n) => (
            <img
              key={n}
              className="gallery-item"
              src={`http://localhost:8080/pic/Home${n}.png`}
              alt={`תמונה ${n}`}
            />
          ))}
        </div>
      </section>

    </div>
  );
}
// import "../style/homeStyle.css";
// import { useEffect, useState } from "react";

// export default function Home() {
//   const [count1, setCount1] = useState(0); // +14M
//   const [count2, setCount2] = useState(0); // +700
//   const [count3, setCount3] = useState(0); // +1.5M
//   const [bgIndex, setBgIndex] = useState(0);
//   const heroImages = ["PP3.jpeg", "PP4.jpeg", "PP5.jpeg", "PP7.jpeg", "PP8.jpeg", "PP9.jpeg", "PP!.jpeg", "PP2.jpeg"];

//   useEffect(() => {
//     const sections = document.querySelectorAll(".section");
//     const observer = new IntersectionObserver(
//       entries => {
//         entries.forEach(entry => {
//           if (entry.isIntersecting) entry.target.classList.add("visible");
//         });
//       },
//       { threshold: 0.2 }
//     );
//     sections.forEach(section => observer.observe(section));
//     return () => observer.disconnect();
//   }, []);

//   useEffect(() => {
//     const interval1 = setInterval(() => {
//       setCount1(prev => (prev < 14 ? prev + 1 : prev));
//       setCount2(prev => (prev < 700 ? prev + 10 : prev));
//       setCount3(prev => (prev < 1.5 ? +(prev + 0.05).toFixed(2) : prev));
//     }, 50);
//     return () => clearInterval(interval1);
//   }, []);

//   useEffect(() => {
//     const bgTimer = setInterval(() => {
//       setBgIndex(prev => (prev + 1) % heroImages.length);
//     }, 3000);
//     return () => clearInterval(bgTimer);
//   }, []);

//   return (
//     <div className="home-container">
//       <section className="hero-section">
//         <img src={`http://localhost:8080/pic/${heroImages[bgIndex]}`} alt="background" className="hero-background" />
//         <div className="hero-overlay">
//           <h1 className="hero-title">על המשמעות+</h1>
//           <p className="hero-sub">מפגש עומק שבועי עם תמיר דורטל</p>
//           <div className="hero-stats">
//             <div><span>+{count1}M</span><p>האזנות</p></div>
//             <div><span>+{count2}</span><p>פרקים</p></div>
//             <div><span>+{count3}M</span><p>האזנות בחודש</p></div>
//           </div>
//           <button className="hero-button" onClick={() => window.location.href = "https://www.peach-in.com/cmp/roIbvgwn8?lang=he"}>אני רוצה להצטרף</button>
//         </div>
//       </section>

//       <section id="about" className="section">
//         <h3>מי אני?</h3>
//         <p>שמי תמר דורטל, עורך דין ומחנך לשעבר, כיום יוצר הפודקאסט "על המשמעות"...</p>
//       </section>

//       <section id="vision" className="section">
//         <h3>החזון שלנו</h3>
//         <p>ליצור מרחב להעמקה רעיונית, לברר סוגיות של זהות, מוסר, כלכלה ויהדות...</p>
//       </section>

//       <section id="content-overview" className="section">
//         <h3>מה תמצאו כאן?</h3>
//         <ul>
//           <li>🎧 מאות פרקים עם מרואיינים מהשורה הראשונה</li>
//           <li>🧠 רעיונות פילוסופיים, כלכליים וערכיים</li>
//           <li>🎤 ראיונות מיוחדים עם אנשי רוח, חוקרים, אנשי צבא ועוד</li>
//           <li>📚 מאמרים, פרשנויות ותובנות</li>
//           <li>🙋‍♀️ קהילה חיה שתומכת ולוקחת חלק</li>
//         </ul>
//       </section>

//       <section className="section join-us">
//         <h3>הצטרפו לקהילת המשמעות</h3>
//         <p>כאן יוצרים יחד שיח עמוק – לחצו והיו חלק מהשינוי התרבותי בישראל.</p>
//         <button className="glow-button" onClick={() => window.location.href = "https://www.peach-in.com/cmp/roIbvgwn8?lang=he"}>להצטרפות</button>
//       </section>

//       <section id="gallery" className="section">
//         <h3>חלק מהנושאים שנדבר עליהם:</h3>
//         <div className="gallery">
//           {[1, 2, 3, 4, 5, 6, 7].map(n => (
//             <img key={n} className="gallery-item" src={`http://localhost:8080/pic/Home${n}.png`} alt={`תמונה ${n}`} />
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }
