
// // import jwt from 'jsonwebtoken';

// // const JWT_SECRET = process.env.JWT_SECRET;

// // const authenticateToken = (req, res, next) => {
// //   const authHeader = req.headers['authorization'];
// //   const token = authHeader && authHeader.split(' ')[1];

// //   if (!token) {
// //     return res.status(401).json('אין טוקן גישה');
// //   }

// //   jwt.verify(token, JWT_SECRET, (err, user) => {
// //     if (err) {
// //       return res.status(403).json('טוקן לא חוקי');
// //     }
// //     req.user = user;
// //     next();
// //   });
// // };

// // export default authenticateToken;
// import jwt from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET;

// export const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.status(401).json('אין טוקן גישה');
//   }

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).json('יש להכנס לאתר מחדש');
//     }
//     req.user = user;
//     next();
//   });
// };

// export const isAdmin = (req, res, next) => {
//   if (req.user?.role === 'admin') {
//     next();
//   } else {
//     res.status(403).json('אין הרשאה - למנהלים בלבד');
//   }
// };
// export const isOwn = (req, res, next) => {
//   const { id } = req.params
//   console.log("in is own id is:",req.user);
  
//   if (req.user?.id === id) {
//     next();
//   } else {
//     res.status(403).json('אין הרשאה -');
//   }
// };
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware לאימות טוקן JWT
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json('אין טוקן גישה');
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json('יש להיכנס לאתר מחדש');
    }
    req.user = user;
    next();
  });
};

// Middleware לבדיקה אם המשתמש הוא אדמין
export const isAdmin = (req, res, next) => {
  if (req.user?.role === 'admin') {
    next();
  } else {
    res.status(403).json('אין הרשאה - למנהלים בלבד');
  }
};

// Middleware לבדיקה אם המשתמש הוא בעל המשאב
export const isOwn = (req, res, next) => {
  const { id } = req.params;
  console.log(req.user);
  const userId = String(req.user?.id); // ודא ששניהם סטרינגים

  if (userId === id) {
    next();
  } else {
    res.status(403).json('אין הרשאה - גישה למשאב זה מוגבלת');
  }
};
