// import pool from '../service/database.js';

// export async function initializeDatabase() {
//   try {
//     // יצירת טבלאות
//     await pool.query(`CREATE TABLE IF NOT EXISTS UserTypes (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       type VARCHAR(50) NOT NULL
//     )`);

//     await pool.query(`CREATE TABLE IF NOT EXISTS Users (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       userName VARCHAR(255) NOT NULL,
//       email VARCHAR(255) NOT NULL UNIQUE,
//       userType INT NOT NULL,
//       profilePic VARCHAR(255) DEFAULT NULL,
//       FOREIGN KEY (userType) REFERENCES UserTypes(id)
//         ON UPDATE CASCADE ON DELETE RESTRICT
//     )`);

//     await pool.query(`CREATE TABLE IF NOT EXISTS Passwords (
//       userId INT PRIMARY KEY,
//       passwordHash VARCHAR(255) NOT NULL,
//       FOREIGN KEY (userId) REFERENCES Users(id)
//         ON UPDATE CASCADE ON DELETE CASCADE
//     )`);

//     await pool.query(`CREATE TABLE IF NOT EXISTS Episodes (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       title VARCHAR(255) NOT NULL,
//       body TEXT NOT NULL,
//       picture VARCHAR(255),
//       adminId INT,
//       isFutureInterview BOOLEAN DEFAULT FALSE,
//       FOREIGN KEY (adminId) REFERENCES Users(id)
//     )`);

//     await pool.query(`CREATE TABLE IF NOT EXISTS Comments (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       episodeId INT NOT NULL,
//       body TEXT NOT NULL,
//       userId INT NOT NULL,
//       connectedType ENUM('episode', 'comment') DEFAULT 'episode',
//       connectId INT DEFAULT NULL,
//       createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
//       FOREIGN KEY (episodeId) REFERENCES Episodes(id)
//         ON UPDATE CASCADE ON DELETE CASCADE,
//       FOREIGN KEY (userId) REFERENCES Users(id)
//         ON UPDATE CASCADE ON DELETE CASCADE,
//       FOREIGN KEY (connectId) REFERENCES Comments(id)
//         ON UPDATE CASCADE ON DELETE CASCADE
//     )`);

//     await pool.query(`CREATE TABLE IF NOT EXISTS Messages (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       senderId INT DEFAULT NULL,
//       recipientId INT DEFAULT NULL,
//       commentId INT DEFAULT NULL,
//       body TEXT NOT NULL,
//       isRead BOOLEAN DEFAULT FALSE,
//       createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
//       FOREIGN KEY (senderId) REFERENCES Users(id) ON DELETE SET NULL,
//       FOREIGN KEY (recipientId) REFERENCES Users(id) ON DELETE CASCADE,
//       FOREIGN KEY (commentId) REFERENCES Comments(id) ON DELETE CASCADE
//     )`);

//     // הכנסת סוגי משתמשים אם אין עדיין
//     const [[{ total: userTypeCount }]] = await pool.query(`SELECT COUNT(*) AS total FROM UserTypes`);
//     if (userTypeCount === 0) {
//       await pool.query(`INSERT INTO UserTypes (type) VALUES ('מנהל'), ('מנוי')`);
//     }

//     // הכנס משתמש אדמין רק אם tamir@gmail.com לא קיים
//     const [[existingAdmin]] = await pool.query(`SELECT id FROM Users WHERE email = 'tamir@gmail.com' LIMIT 1`);
//     if (!existingAdmin) {
//       const [adminResult] = await pool.query(`
//         INSERT INTO Users (userName, email, userType, profilePic)
//         VALUES ('תמיר דורטל', 'tamir@gmail.com', 1, 'PP8.jpeg')
//       `);
//       const adminId = adminResult.insertId;

//       await pool.query(`
//         INSERT INTO Passwords (userId, passwordHash)
//         VALUES (?, ?)
//       `, [adminId, '$2b$10$t/.QzhlFEuzqZMyGzyIn.O8iaksjhI9xc9PSDSAdiMf2Uidibc1TO']);
//     }

//     // נוודא שיש אדמין
//     const [[admin]] = await pool.query(`SELECT id FROM Users WHERE userType = 1 LIMIT 1`);
//     const adminId = admin?.id;
//     if (!adminId) throw new Error("No admin user found to associate with episodes.");

//     // הוספת פרקים
//     const episodesData = [
//       ['היינו צריכים לתקוף באיראן מזמן', 'ח"כ אביגדור ליברמן על היועמשית, גיוס חרדים, צה"ל, 7.10, נתניהו...', 'avigdor.png', false],
//       ['האם בינה מלאכותית באמת חושבת?', 'ד"ר אלישע רוזנצוויג על המהפכה שתשנה את חיינו לנצח!', 'elisha.png', false],
//       ['חמאס הוא נכס?', 'ד"ר יובל שטייניץ: "מערכת הביטחון טענה שעדיף שחמאס יישאר בעזה עוד ב-2014"', 'yoval.png', false],
//       ['טראמפ תמך בהגירת מיליון עזתים...', 'יו"ר "עד כאן" גלעד אך בביקורת חריפה!', 'gilad.png', false],
//       ['אין הבדל בין ערביי עזה לערביי ישראל', 'בחזרה ללילות האימה בלוד בזמן ׳שומר החומות׳ עם הדר מילר', 'HADAR.png', false],
//       ['הסיוע האמריקאי והכלכלה הישראלית', 'ראיון עם שר האוצר בצלאל סמוטריץ', 'smo.png', true],
//       ['רפורמה משפטית ודיון על בג"ץ', 'שיחה עם פרופ', 'MOSHE.png', true],
//       ['משילות והתיישבות', 'שר הפנים איתמר בן גביר על סדר יום ביטחוני והתיישבות', 'ITAMAR.png', true]
//     ];

//     for (const [title, body, picture, isFutureInterview] of episodesData) {
//       await pool.query(`
//         INSERT INTO Episodes (title, body, adminId, picture, isFutureInterview)
//         VALUES (?, ?, ?, ?, ?)
//       `, [title, body, adminId, picture, isFutureInterview]);
//     }

//     // הוספת משתמשים רגילים אם אינם קיימים
//     const usersToAdd = [
//       { name: 'יואב כהן', email: 'yoav@gmail.com' },
//       { name: 'רונית לוי', email: 'ronit@gmail.com' },
//       { name: 'איתן ברק', email: 'eytan@gmail.com' }
//     ];

//     for (const user of usersToAdd) {
//       const [[exists]] = await pool.query(`SELECT id FROM Users WHERE email = ? LIMIT 1`, [user.email]);
//       if (!exists) {
//         await pool.query(`INSERT INTO Users (userName, email, userType) VALUES (?, ?, 2)`, [user.name, user.email]);
//       }
//     }

//     // הכנסת תגובות רק אם יש לפחות 3 משתמשים רגילים
//     const [users] = await pool.query(`SELECT id FROM Users WHERE userType = 2 LIMIT 3`);
//     if (users.length >= 3) {
//       const [user1, user2, user3] = users;

//       const commentsData = [
//         [1, 'איך הסיוע הזה מתורגם לתקציב בפועל?', user1.id],
//         [1, 'האם הסיוע הזה זמני או קבוע?', user2.id],
//         [2, 'מה צפוי להיות בעתיד בעקבות הניצחון?', user1.id],
//         [2, 'האם מדובר בהפסקת אש או ניצחון ממשי?', user3.id],
//         [3, 'מה היה המחיר שהחברה הישראלית שילמה?', user2.id],
//         [3, 'איך העסקה משפיעה על הרתעה עתידית?', user3.id],
//         [4, 'מהן ההשלכות של הרפורמה על מערכת המשפט?', user1.id],
//         [4, 'האם זה מחליש את עצמאות בג"ץ?', user2.id],
//         [5, 'איך ניתן להחזיר משילות בדרום?', user3.id],
//         [5, 'מהו החזון להתיישבות בשטחי C?', user1.id]
//       ];

//       for (const [episodeId, body, userId] of commentsData) {
//         await pool.query(`
//           INSERT INTO Comments (episodeId, body, userId)
//           VALUES (?, ?, ?)
//         `, [episodeId, body, userId]);
//       }
//     }

//     console.log("✅ Database initialized with users, episodes, and comments.");
//   } catch (err) {
//     console.error("❌ Database setup failed:", err.message);
//   }
// }

import pool from '../service/database.js';

export async function initializeDatabase() {
  try {
    // יצירת טבלאות
    await pool.query(`CREATE TABLE IF NOT EXISTS UserTypes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      type VARCHAR(50) NOT NULL
    )`);

    await pool.query(`CREATE TABLE IF NOT EXISTS Users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userName VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      userType INT NOT NULL,
      profilePic VARCHAR(255) DEFAULT NULL,
      FOREIGN KEY (userType) REFERENCES UserTypes(id)
        ON UPDATE CASCADE ON DELETE RESTRICT
    )`);

    await pool.query(`CREATE TABLE IF NOT EXISTS Passwords (
      userId INT PRIMARY KEY,
      passwordHash VARCHAR(255) NOT NULL,
      FOREIGN KEY (userId) REFERENCES Users(id)
        ON UPDATE CASCADE ON DELETE CASCADE
    )`);

    await pool.query(`CREATE TABLE IF NOT EXISTS Episodes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      body TEXT NOT NULL,
      picture VARCHAR(255),
      adminId INT,
      isFutureInterview BOOLEAN DEFAULT FALSE,
      FOREIGN KEY (adminId) REFERENCES Users(id)
    )`);

    await pool.query(`CREATE TABLE IF NOT EXISTS Comments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      episodeId INT NOT NULL,
      body TEXT NOT NULL,
      userId INT NOT NULL,
      connectedType ENUM('episode', 'comment') DEFAULT 'episode',
      connectId INT DEFAULT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      isQuestion TINYINT(1) DEFAULT 0,
      FOREIGN KEY (episodeId) REFERENCES Episodes(id)
        ON UPDATE CASCADE ON DELETE CASCADE,
      FOREIGN KEY (userId) REFERENCES Users(id)
        ON UPDATE CASCADE ON DELETE CASCADE,
      FOREIGN KEY (connectId) REFERENCES Comments(id)
        ON UPDATE CASCADE ON DELETE CASCADE
    )`);

    await pool.query(`CREATE TABLE IF NOT EXISTS Messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      senderId INT DEFAULT NULL,
      recipientId INT DEFAULT NULL,
      commentId INT DEFAULT NULL,
      body TEXT NOT NULL,
      isRead BOOLEAN DEFAULT FALSE,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (senderId) REFERENCES Users(id) ON DELETE SET NULL,
      FOREIGN KEY (recipientId) REFERENCES Users(id) ON DELETE CASCADE,
      FOREIGN KEY (commentId) REFERENCES Comments(id) ON DELETE CASCADE
    )`);

    const [[{ total: userTypeCount }]] = await pool.query(`SELECT COUNT(*) AS total FROM UserTypes`);
    if (userTypeCount === 0) {
      await pool.query(`INSERT INTO UserTypes (type) VALUES ('מנהל'), ('מנוי')`);
    }

    const [[existingAdmin]] = await pool.query(`SELECT id FROM Users WHERE email = 'tamir@gmail.com' LIMIT 1`);
    if (!existingAdmin) {
      const [adminResult] = await pool.query(`
        INSERT INTO Users (userName, email, userType, profilePic)
        VALUES ('תמיר דורטל', 'tamir@gmail.com', 1, 'PP8.jpeg')
      `);
      const adminId = adminResult.insertId;

      await pool.query(`
        INSERT INTO Passwords (userId, passwordHash)
        VALUES (?, ?)
      `, [adminId, '$2b$10$t/.QzhlFEuzqZMyGzyIn.O8iaksjhI9xc9PSDSAdiMf2Uidibc1TO']);
    }

    const [[admin]] = await pool.query(`SELECT id FROM Users WHERE userType = 1 LIMIT 1`);
    const adminId = admin?.id;
    if (!adminId) throw new Error("No admin user found to associate with episodes.");

    const episodesData = [
      ['היינו צריכים לתקוף באיראן מזמן', 'ח"כ אביגדור ליברמן על היועמשית...', 'avigdor.png', false],
      ['האם בינה מלאכותית באמת חושבת?', 'ד"ר אלישע רוזנצוויג על המהפכה...', 'elisha.png', false],
      ['חמאס הוא נכס?', 'ד"ר יובל שטייניץ: מערכת הביטחון...', 'yoval.png', false],
      ['טראמפ תמך בהגירת מיליון עזתים...', 'יו"ר "עד כאן" גלעד אך בביקורת...', 'gilad.png', false],
      ['אין הבדל בין ערביי עזה לערביי ישראל', 'בחזרה ללילות האימה בלוד...', 'HADAR.png', false],
      ['הסיוע האמריקאי והכלכלה הישראלית', 'ראיון עם סמוטריץ', 'smo.png', true],
      ['רפורמה משפטית ודיון על בג"ץ', ' שיחה עם הפרופ', 'MOSHE.png', true],
      ['משילות והתיישבות', 'איתמר בן גביר על סדר יום ביטחוני...', 'ITAMAR.png', true]
    ];

    for (const [title, body, picture, isFutureInterview] of episodesData) {
      await pool.query(`
        INSERT INTO Episodes (title, body, adminId, picture, isFutureInterview)
        VALUES (?, ?, ?, ?, ?)
      `, [title, body, adminId, picture, isFutureInterview]);
    }

    const usersToAdd = [
      { name: 'יואב כהן', email: 'yoav@gmail.com' },
      { name: 'רונית לוי', email: 'ronit@gmail.com' },
      { name: 'איתן ברק', email: 'eytan@gmail.com' }
    ];

    for (const user of usersToAdd) {
      const [[exists]] = await pool.query(`SELECT id FROM Users WHERE email = ? LIMIT 1`, [user.email]);
      if (!exists) {
        await pool.query(`INSERT INTO Users (userName, email, userType) VALUES (?, ?, 2)`, [user.name, user.email]);
      }
    }

    const [users] = await pool.query(`SELECT id FROM Users WHERE userType = 2 LIMIT 3`);
    if (users.length >= 3) {
      const [user1, user2, user3] = users;

      const commentsData = [
        [1, 'פרק חשוב ומדויק 👏', user1.id, 0],
        [1, 'האם תוקפנות הייתה מוצדקת לפי הדין הבינלאומי?', user2.id, 1],
        [2, 'הסבר מצוין על AI, תודה!', user3.id, 0],
        [2, 'מה הסכנות בשימוש בלתי אחראי בבינה מלאכותית?', user1.id, 1],
        [3, 'האם הממשלה באמת האמינה בזה?', user2.id, 1],
        [3, 'ניתוח מעולה של המציאות', user1.id, 0],
        [4, 'איך פספסו את ההזדמנות?', user3.id, 1],
        [4, 'תגובה מלמדת מאוד', user2.id, 0],
        [5, 'זוכרת את הלילות האלה... מצמרר', user3.id, 0],
        [5, 'האם ניתן להחזיר את האמון הציבורי?', user1.id, 1],
        [6, 'תודה על הפירוט הכלכלי', user2.id, 0],
        [6, 'האם הסיוע האמריקאי ישתנה עם הממשל הבא?', user3.id, 1],
        [7, 'שיחה מעניינת על מערכת המשפט', user1.id, 0],
        [7, 'האם יש סכנה לדמוקרטיה?', user2.id, 1],
        [8, 'בן גביר חד כתער', user3.id, 0],
        [8, 'מהו החזון שלו ל-10 השנים הקרובות?', user1.id, 1]
      ];

      for (const [episodeId, body, userId, isQuestion] of commentsData) {
        await pool.query(`
          INSERT INTO Comments (episodeId, body, userId, isQuestion)
          VALUES (?, ?, ?, ?)
        `, [episodeId, body, userId, isQuestion]);
      }
    }

    console.log("✅ Database initialized with users, episodes, and comments.");
  } catch (err) {
    console.error("❌ Database setup failed:", err.message);
  }
}
