// import { Console } from 'console';
// import multer from 'multer'; // מייבא את הספרייה multer שמנהלת העלאת קבצים
// import path from 'path';     // מייבא את path לצורך טיפול בשמות נתיבים (לא חובה כאן אבל טוב שיהיה)

// // הגדרת האחסון של הקבצים
// const storage = multer.diskStorage({
//   // מגדיר את הנתיב שבו יישמר הקובץ
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/episodes'); // התיקייה שאליה יישמרו הקבצים (יחסית לתיקיית הבסיס של הפרויקט)
//   },
//   // מגדיר את שם הקובץ שישמר
//   filename: function (req, file, cb) {
//     const filename = Date.now() + '-' + file.originalname; // מוסיף timestamp כדי למנוע כפילויות
//     cb(null, filename); // שולח את השם החדש
//     console.log("in file name");
//     console.log(filename);
//   }
// });

// // יצירת מופע multer עם ההגדרות
// export const upload = multer({ storage }); // export כדי שתוכלי להשתמש בו ב־routes
// ✅ uploadMiddleware.js
import multer from 'multer';
import path from 'path';

// סיווג לפי סוג קובץ: פרקי ראיונות או משתמשים
const fileDestination = (req, file, cb) => {
  const isEpisodeUpload = req.baseUrl.includes('/episodes');
  const folder = isEpisodeUpload ? 'uploads/episodes' : 'uploads/users';
  cb(null, folder);
};

const fileName = (req, file, cb) => {
  const filename = Date.now() + '-' + file.originalname;
  cb(null, filename);
};

const storage = multer.diskStorage({
  destination: fileDestination,
  filename: fileName
});

export const upload = multer({ storage });

