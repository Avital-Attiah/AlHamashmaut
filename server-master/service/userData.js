
import pool from './database.js';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const getUsersPaged = async (page = 1, limit = 12) => {
  const offset = (page - 1) * limit;

  try {
    const [rows] = await pool.query(`
      SELECT u.id, u.userName, u.email, ut.type AS userType
      FROM Users u
      JOIN UserTypes ut ON u.userType = ut.id
      ORDER BY u.id
      LIMIT ? OFFSET ?
    `, [limit, offset]);

    return rows;
  } catch (error) {
    throw new Error('Failed to fetch paged users'); // עדכן: הוחלף הודעד לענגלית השגיאה
  }
};

export const getUserByEmail = async (email) => {
  try {
    const [rows] = await pool.query(
      `
      SELECT 
        Users.id,
        Users.userName,
        Users.email,
        UserTypes.type AS userType,
        Passwords.passwordHash
      FROM Users
      JOIN UserTypes ON Users.userType = UserTypes.id
      JOIN Passwords ON Users.id = Passwords.userId
      WHERE Users.email = ?
      `,
      [email]
    );

    return rows[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const addUser = async (user) => {
  const { userName, email, userType, passwordHash } = user;

  try {
    const [typeRows] = await pool.query(
      'SELECT id FROM UserTypes WHERE type = ?',
      [userType]
    );

    if (typeRows.length === 0) {
      console.log(`User type "${userType}" does not exis`)
      throw new Error(`User type "${userType}" does not exist`); // שינוי משגיאה ספציפית
    }

    const userTypeId = typeRows[0].id;

    const [result] = await pool.query(
      'INSERT INTO Users (userName, email, userType) VALUES (?, ?, ?)',
      [userName, email, userTypeId] // התאמה לשמות בטבלה
    );

    const userId = result.insertId;

    const success = await addPassword(userId, passwordHash);

    if (!success) {
      await deleteUser(userId);
      throw new Error("Failed to add user password"); // שינוי שגיאה
    }

    return userId;

  } catch (error) {
    console.log("Add user error:", error.message);
    throw new Error('Failed to add user'); // שינוי שגיאה
  }
};

export const updateUser = async (id, user) => {
  const fields = [];
  const values = [];

  try {
    if (user.userName) {
      fields.push('userName = ?');
      values.push(user.userName);
    }

    if (user.email) {
      fields.push('email = ?');
      values.push(user.email);
    }

    if (user.userType) {
      fields.push('userType = ?');
      values.push(user.userType);
    }

    if (fields.length > 0) {
      const query = `UPDATE Users SET ${fields.join(', ')} WHERE id = ?`;
      values.push(id);
      await pool.query(query, values);
    }
  } catch (err) {
    console.error('User update error:', err.message);
    throw new Error('Failed to update user');
  }

  if (user.password) {
    try {
      const newHash = await bcrypt.hash(user.password, SALT_ROUNDS);
      await updatePassword(id, newHash);
    } catch (err) {
      console.error('Password update error:', err.message);
      throw new Error('Failed to update password');
    }
  }

  return true;
};



export const deleteUser = async (id) => {
  try {
    // מחיקת הסיסמה מטבלת Passwords
    const [passwordResult] = await pool.query(
      'DELETE FROM Passwords WHERE userId = ?',
      [id]
    );

    // מחיקת המשתמש מטבלת Users
    const [userResult] = await pool.query(
      'DELETE FROM Users WHERE id = ?',
      [id]
    );

    // מחזיר true רק אם נמחקה לפחות שורה אחת מכל טבלה
    return userResult.affectedRows > 0 && passwordResult.affectedRows > 0;

  } catch (error) {
    console.error('Delete user error:', error.message);
    throw new Error('Failed to delete user');
  }
};

export const addPassword = async (userId, plainPassword) => {
export const addPassword = async (userId, plainPassword) => {
  try {
    const passwordHash = await bcrypt.hash(plainPassword, SALT_ROUNDS);
    const passwordHash = await bcrypt.hash(plainPassword, SALT_ROUNDS);

    const [result] = await pool.query(
      'INSERT INTO Passwords (userId, passwordHash) VALUES (?, ?)', // התאמה לשמות בטבלה
      [userId, passwordHash]
    );

    return true;
  } catch (error) {
    console.error("Add password error:", error);
    return false;
  }
};



const updatePassword = async (userId, passwordHash) => {
  try {
    const [result] = await pool.query(
      'UPDATE Passwords SET passwordHash = ? WHERE userId = ?',
      [passwordHash, userId]
    );
    return true;
  } catch {
    return false;
  }
};

export const getPassword = async (userId) => {
  try {
    const [result] = await pool.query(
      'SELECT passwordHash FROM Passwords WHERE userId = ?',
      [userId]
    );
    return result[0].passwordHash;
  } catch {
    throw new Error('Invalid user password'); // שינוי שגיאה
  }
};
export const verifyPassword = async (userId, plainPassword) => {
  const currentHash = await getPassword(userId);
  return bcrypt.compare(plainPassword, currentHash);
};
export const getUserByUserName = async (userName) => {
  const [rows] = await pool.query('SELECT * FROM Users WHERE userName = ?', [userName]);
  return rows[0];
};
