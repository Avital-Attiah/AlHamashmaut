import multer from 'multer'; // מייבא את הספרייה multer שמנהלת העלאת קבצים
import path from 'path';     // מייבא את path לצורך טיפול בשמות נתיבים (לא חובה כאן אבל טוב שיהיה)

// הגדרת האחסון של הקבצים
const storage = multer.diskStorage({
  // מגדיר את הנתיב שבו יישמר הקובץ
  destination: function (req, file, cb) {
    cb(null, 'uploads/episodes'); // התיקייה שאליה יישמרו הקבצים (יחסית לתיקיית הבסיס של הפרויקט)
  },
  // מגדיר את שם הקובץ שישמר
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname; // מוסיף timestamp כדי למנוע כפילויות
    cb(null, uniqueName); // שולח את השם החדש
  }
});

// יצירת מופע multer עם ההגדרות
export const upload = multer({ storage }); // export כדי שתוכלי להשתמש בו ב־routes
