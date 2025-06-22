
import {
  getUsersPaged,
  addUser,
  deleteUser,
  updateUser,
  getUserByEmail,
  verifyPassword
} from '../service/userData.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

/**
 * בדיקת תקינות שדות משתמש
 * @param {Object} data 
 * @param {Object} options 
 * @returns {Object} { isValid, errors }
 */
function validateUserData(data, options = { email: true, password: true, userName: false }) {
  const errors = {};

  if (options.email) {
    const email = data.email || '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = "המייל אינו תקני";
    }
  }

  if (options.password) {
    const password = data.password || '';
    if (password.length < 6) {
      errors.password = "הסיסמה חייבת להכיל לפחות 6 תווים";
    }
  }

  if (options.userName) {
    const userName = data.userName || '';
    if (!/^[\u0590-\u05FF]+$/.test(userName) || userName.length < 2) {
      errors.userName = "שם משתמש חייב להכיל לפחות 2 אותיות בעברית בלבד";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export class user {

  getAllUsers = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 12;
      const users = await getUsersPaged(page, limit);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "שגיאה בעת שליפת המשתמשים" });
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const { isValid, errors } = validateUserData({ email, password });

      if (!isValid) {
        return res.status(400).json({ message: "שדות לא תקינים", errors });
      }

      const user = await getUserByEmail(email);
      if (!user) return res.status(404).json({ message: 'משתמש לא נמצא' });

      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) return res.status(401).json({ message: 'סיסמה שגויה' });

      const { passwordHash, ...userWithoutPassword } = user;
      const token = jwt.sign(userWithoutPassword, process.env.JWT_SECRET, { expiresIn: '2h' });

      res.status(200).json({ user: userWithoutPassword, token });

    } catch (error) {
      console.error('Login error:', error.message);
      res.status(500).json({ message: 'שגיאה בשרת' });
    }
  };

  update = async (req, res) => {
    try {
      const id = req.params.id;
      const { password, lastPassword } = req.body;

      const { isValid, errors } = validateUserData(req.body, {
        email: !!req.body.email,
        password: !!password,
        userName: !!req.body.userName
      });

      if (!isValid) {
        return res.status(400).json({ message: "שדות לא תקינים", errors });
      }

      if (password || lastPassword) {
        if (!password || !lastPassword) {
          return res.status(400).json({ message: 'חובה להזין גם סיסמה נוכחית וגם חדשה' });
        }

        const authorized = await verifyPassword(id, lastPassword);
        if (!authorized) return res.status(401).json({ message: 'סיסמה נוכחית שגויה' });
      }

      await updateUser(id, req.body);
      res.status(200).json({ message: 'המשתמש עודכן בהצלחה' });

    } catch (error) {
      console.error('Update error:', error.message);
      res.status(422).json({ message: 'שגיאה בעיבוד הנתונים' });
    }
  };

  add = async (req, res) => {
    try {
      const newUser = req.body;

      const { isValid, errors } = validateUserData(newUser, {
        email: true,
        password: true,
        userName: true
      });

      if (!isValid) {
        return res.status(400).json({ message: "שדות לא תקינים", errors });
      }

      const passwordHash = await bcrypt.hash(newUser.password, 10);
      const userToSave = {
        ...newUser,
        passwordHash,
        userType: 2
      };

      const user = await addUser(userToSave);
      if (!user) {
        return res.status(404).json({ message: 'שגיאה בשמירת המשתמש' });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          userName: user.userName,
          userType: user.userType
        },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
      );

      res.status(201).json({ user, token });

    } catch (error) {
      console.error('Add user error:', error.message);
      const msg = error.message.includes('כבר קיים') ? error.message : 'שגיאה בעת יצירת משתמש';
      res.status(400).json({ message: msg });
    }
  };

  delete = async (req, res) => {
    try {
      const userId = req.params.id;
      const deleted = await deleteUser(userId);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "משתמש לא נמצא" });
      }
    } catch (error) {
      res.status(500).json({ message: "שגיאה במחיקת משתמש" });
    }
  };
}
