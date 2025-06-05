// const jwt = require('jsonwebtoken');
// // require('dotenv').config();

// const JWT_SECRET = process.env.JWT_SECRET;

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

//   if (!token) {
//     return res.status(401).json( 'אין טוקן גישה' );
//   }

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).json( 'טוקן לא חוקי' );
//     }
//     req.user = user;
//     next();
//   });
// };

// module.exports = authenticateToken;
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json('אין טוקן גישה');
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json('טוקן לא חוקי');
    }
    req.user = user;
    next();
  });
};

export default authenticateToken;
