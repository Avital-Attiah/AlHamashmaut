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

// Middleware לבדיקה אם המשתמש הוא מנהל
export const isAdmin = (req, res, next) => {
  const type = req.user?.userType;
  if (type === 1 || type === 'מנהל') {
    next();
  } else {
    res.status(403).json('אין הרשאה - למנהלים בלבד');
  }
};

// Middleware לבדיקה אם המשתמש הוא בעל המשאב
export const isOwn = (req, res, next) => {
  const { id } = req.params;
  const userId = String(req.user?.id); // שניהם מומרו למחרוזת

  if (userId === id) {
    next();
  } else {
    res.status(403).json('אין הרשאה - גישה למשאב זה מוגבלת');
  }
};
