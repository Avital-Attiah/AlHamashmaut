import pool from './database.js';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;


// פונקציה לשליפת כל המשתמשים
// export const getAllUsers = async () => {
//   try {
//     const [rows] = await pool.query('SELECT * FROM users');
//     return rows;
//   } catch (error) {
//     throw new Error('שגיאה בשאילתת נתונים');
//   }
// };
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
    throw new Error('שגיאה בשליפת משתמשים מדורגת');
  }
};

 

// export const getUserByEmail = async (email) => {
//   try {
//     const [rows] = await pool.query('SELECT * FROM users where email=?',[email]);
//     console.log(rows)
//     return rows[0];
//   } catch (error) {
//    return null;
//   }
// };
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
    
    console.log(rows);
    return rows[0]; // אם אין תוצאה זה יחזיר undefined
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const addUser = async (user) => {
  const { userName, email, passwordHash } = user;
  try {
    console.log("ניסיון להוסיף משתמש חדש:", user);

    const [result] = await pool.query(
      'INSERT INTO Users (userName, email, userType) VALUES (?, ?, ?)',
      [userName, email, user.userType || 1]
    );

    let success = await addPassword(result.insertId, passwordHash);
    if (!success) {
      await deleteUser(result.insertId);
      throw new Error("הוספת סיסמה נכשלה");
    }

    return result.insertId;
  } catch (error) {
    console.error("שגיאה אמיתית ב־addUser:", error.message); // ← זה מה שחשוב
    throw new Error('שגיאה בהוספת נתונים');
  }
};



// פונקציה לעדכון משתמש לפי ID
// export const updateUser = async (id, user) => {
//   const { username,password,lastPassword } = user;
//   try {
//     const [result] = await pool.query(
//       'UPDATE users SET username = ? WHERE id = ?',
//       [username, id]
//     );
//       let successfullyUpdate = await updatePassword(id, password); 
//     if (!successfullyUpdate) {
//       console.error(" עידכון סיסמה למשתמש נכשלה", result.insertId);
//       await deleteUser(result.insertId);
//       throw new Error("עדכון סיסמה נכשלה");
//     }
//     return result;
//   } catch (error) {
//     throw new Error('שגיאה בעדכון נתונים');
//   }
// };
export const updateUser = async (id, user) => {
  const fields = [];
  const values = [];

  try {
    // טבלת Users
    if (user.userName) {
      fields.push('userName = ?');
      values.push(user.username);
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
    throw new Error('Failed to update user details');
  }

  // עדכון סיסמה
  if (user.password && user.lastPassword) {
    try {
      const currentHash = await getPassword(id);
      const match = await bcrypt.compare(user.lastPassword, currentHash);
      if (!match) {
        console.error('Password mismatch for user ID:', id);
        throw new Error('Failed to update user details');
      }

      const newHash = await bcrypt.hash(user.password, 10);
      await pool.query(
        'UPDATE Passwords SET passwordHash = ? WHERE userId = ?',
        [newHash, id]
      );
    } catch (err) {
      console.error('Password update error:', err.message);
      throw new Error('Failed to update user details');
    }
  }

  return true;
};
// פונקציה למחיקת משתמש לפי ID
export const deleteUser = async (id) => {
  try {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
    const isdeletePassword = await deletePassword(id);//מוחק את הסיסמה של המשתמש
    console.log(isdeletePassword);
    console.log(result.affectedRows > 0);
    return result.affectedRows > 0 && isdeletePassword;
  } catch (error) {
    throw new Error('שגיאה במחיקת נתוני המשתמש');
  }
};

export const addPassword = async (userId, plainPassword) => {
  try {
    const passwordHash = await bcrypt.hash(plainPassword, SALT_ROUNDS);

    const [result] = await pool.query(
      'INSERT INTO passwords (userId, passwordHash) VALUES (?, ?)',
      [userId, passwordHash]
    );

    console.log(result);
    return true;
  } catch (error) {
    console.error("שגיאה בהוספת סיסמה:", error);
    return false;
  }}

const deletePassword = async (id) => {
  try {
    const [result] = await pool.query('DELETE FROM passwords WHERE userId  = ?', [id]);
    console.log(result);
    return true;
  }
  catch {
    return false;
  }
};

const updatePassword = async (userId, passwordHash) => {
  try {
    const [result] = await pool.query   ('UPDATE passwords SET passwordHash = ? WHERE userId = ?',
      [passwordHash,userId]
    );
    console.log(result);
    return true;
  }
  catch {
    return false;
  }
};
 export  const getPassword = async (userId) => {
  try {
    console.log(userId);
    const [result] = await pool.query('select passwordHash from passwords WHERE userId = ?',
      [userId]
    );
    console.log(result);
    return result[0].passwordHash;
  }
  catch {
    throw new Error('משתמש עם סיסמה לא תיקנית');
  }
};
export const getUserByUserName = async (userName) => {
  const [rows] = await pool.query('SELECT * FROM Users WHERE userName = ?', [userName]);
  return rows[0];
};
