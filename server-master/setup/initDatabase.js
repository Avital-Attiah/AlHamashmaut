
import pool from '../service/database.js';


export async function initializeDatabase() {
  try {
    // יצירת בסיס הנתונים אם אינו קיים
    // await pool.query(`CREATE DATABASE IF NOT EXISTS ${process.env.mysql_databas}`);
    // await pool.query(`USE ${process.env.mysql_databas}`);
await pool.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQL_DATABASE}\``);
await pool.query(`USE \`${process.env.MYSQL_DATABASE}\``);

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
      await pool.query(`INSERT INTO UserTypes (type) VALUES ('admin'), ('subscriber')`);
    

    const [[{ total: userCount }]] = await pool.query(`SELECT COUNT(*) AS total FROM Users`);
    if (userCount === 0) {
      const [adminUser] = await pool.query(`
        INSERT INTO Users (userName, email, userType, profilePic)
        VALUES ('תמיר דורטל', 'tamir@gmail.com', 1, 'PP8.jpeg')
      `);
      const adminId = adminUser.insertId;

      await pool.query(`
        INSERT INTO Passwords (userId, passwordHash)
        VALUES (?, ?)
      `, [adminId, '$2b$10$t/.QzhlFEuzqZMyGzyIn.O8iaksjhI9xc9PSDSAdiMf2Uidibc1TO']);

      await pool.query(`
        INSERT INTO Episodes (title, body, adminId, picture)
        VALUES 
        ('היינו צריכים לתקוף באיראן מזמן', 'ח"כ אביגדור ליברמן על היועמשית, גיוס חרדים, צה"ל, 7.10, נתניהו...', ?, 'avigdor.png'),
        ('האם בינה מלאכותית באמת חושבת?', 'ד"ר אלישע רוזנצוויג על המהפכה שתשנה את חיינו לנצח!', ?, 'elisha.png'),
       
        ('חמאס הוא נכס?', 'ד"ר יובל שטייניץ:"מערכת הביטחון טענה שעדיף שחמאס יישאר בעזה עוד ב-2014"', ?, 'yoval.png'),
        ('טראמפ תמך בהגירת מיליון עזתים, הממשלה גימגמה וההזדמנות הוחמצה', 'יו"ר "עד כאן" גלעד אך בביקורת חריפה!', ?, 'gilad.png'),
        ('אין הבדל בין ערביי עזה לערביי ישראל', 'בחזרה ללילות האימה בלוד בזמן ׳שומר החומות׳ עם הדר מילר', ?, 'HADAR.png')
      `, [adminId, adminId, adminId, adminId, adminId, adminId]);
      await pool.query(`
        INSERT INTO Episodes (title, body, adminId, picture, isFutureInterview) VALUES
        ('הסיוע האמריקאי והכלכלה הישראלית', 'ראיון עם שר האוצר בצלאל סמוטריץ\' על הכלכלה והסיוע האמריקאי', ?, 'smo.png', TRUE),
        ('רפורמה משפטית ודיון על בג\'\'ץ', 'שיחה עם פרופ\' משה כהן אליה על ההשלכות של הרפורמה', ?, 'MOSHE.png', TRUE),
        ('משילות והתיישבות', 'שר הפנים איתמר בן גביר על סדר יום ביטחוני והתיישבות', ?, 'ITAMAR.png', TRUE)
      `, [adminId, adminId, adminId, adminId, adminId]);}

      const [user1] = await pool.query(`INSERT INTO Users (userName, email, userType) VALUES ('יואב כהן', 'yoav@gmail.com', 2)`);
      const [user2] = await pool.query(`INSERT INTO Users (userName, email, userType) VALUES ('רונית לוי', 'ronit@gmail.com', 2)`);
      const [user3] = await pool.query(`INSERT INTO Users (userName, email, userType) VALUES ('איתן ברק', 'eytan@gmail.com', 2)`);
      await pool.query(`
        INSERT INTO Comments (episodeId, body, userId) VALUES
        (1, 'איך הסיוע הזה מתורגם לתקציב בפועל?', ?),
        (1, 'האם הסיוע הזה זמני או קבוע?', ?),
        (2, 'מה צפוי להיות בעתיד בעקבות הניצחון?', ?),
        (2, 'האם מדובר בהפסקת אש או ניצחון ממשי?', ?),
        (3, 'מה היה המחיר שהחברה הישראלית שילמה?', ?),
        (3, 'איך העסקה משפיעה על הרתעה עתידית?', ?),
        (4, 'מהן ההשלכות של הרפורמה על מערכת המשפט?', ?),
        (4, 'האם זה מחליש את עצמאות בג\'\'ץ?', ?),
        (5, 'איך ניתן להחזיר משילות בדרום?', ?),
        (5, 'מהו החזון להתיישבות בשטחי C?', ?)
      `, [user1.insertId, user2.insertId, user1.insertId, user3.insertId, user2.insertId, user3.insertId, user1.insertId, user2.insertId, user3.insertId, user1.insertId]);
   

    }
      
    console.log("✅ Database initialized with episodes and comments.");
  } catch (err) {
    console.error("❌ Database setup failed:", err.message);
  }
}
