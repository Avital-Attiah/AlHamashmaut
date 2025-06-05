import pool from './database.js';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

// פונקציה לשליפת כל המשתמשים
export const getAllUsers = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
  } catch (error) {
    throw new Error('שגיאה בשאילתת נתונים');
  }
};
 

export const getUserByEmail = async (email) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users where email=?',[email]);
    console.log(rows)
    return rows[0];
  } catch (error) {
   return null;
  }
};
export const addUser = async (user) => {
  const { username, email, password } = user;
  try {
    const [result] = await pool.query(
      'INSERT INTO users (username, email) VALUES (?, ?)',
      [username, email]
    );
    let successfullyAdded = await addPassword(result.insertId, password); // קרא לפונקציה כמו שצריך
    if (!successfullyAdded) {
      console.error(" הוספת סיסמה למשתמש נכשלה", result.insertId);
      await deleteUser(result.insertId);
      throw new Error("הוספת סיסמה נכשלה");
    }
    return result.insertId;
  } catch (error) {
    throw new Error('שגיאה בהוספת נתונים');
  }
};


// פונקציה לעדכון משתמש לפי ID
export const updateUser = async (id, user) => {
  const { username,password,lastPassword } = user;
  try {
    const [result] = await pool.query(
      'UPDATE users SET username = ? WHERE id = ?',
      [username, id]
    );
      let successfullyUpdate = await updatePassword(id, password); 
    if (!successfullyUpdate) {
      console.error(" עידכון סיסמה למשתמש נכשלה", result.insertId);
      await deleteUser(result.insertId);
      throw new Error("עדכון סיסמה נכשלה");
    }
    return result;
  } catch (error) {
    throw new Error('שגיאה בעדכון נתונים');
  }
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
//פונקציה בוליאנית לסיסמה משתמש
// export const addPassword = async (user_id, plainPassword) => {
//   try {
//     const password_hash = await bcrypt.hash(plainPassword, SALT_ROUNDS);

//     const [result] = await pool.query(
//       'INSERT INTO passwords (user_id, password_hash) VALUES (?, ?)',
//       [user_id, password_hash]
//     );

//     console.log(result);
//     return true;
//   } catch (error) {
//     console.error("שגיאה בהוספת סיסמה:", error);
//     return false;
//   }}

const deletePassword = async (id) => {
  try {
    const [result] = await pool.query('DELETE FROM passwords WHERE user_id  = ?', [id]);
    console.log(result);
    return true;
  }
  catch {
    return false;
  }
};

const updatePassword = async (user_id, password_hash) => {
  try {
    const [result] = await pool.query   ('UPDATE passwords SET password_hash = ? WHERE user_id = ?',
      [password_hash,user_id]
    );
    console.log(result);
    return true;
  }
  catch {
    return false;
  }
};
 export  const getPassword = async (user_id) => {
  try {
    console.log(user_id);
    const [result] = await pool.query   ('select password_hash from passwords WHERE user_id = ?',
      [user_id]
    );
    console.log(result);
    return result[0].password_hash;
  }
  catch {
    throw new Error('משתמש עם סיסמה לא תיקנית');
  }
};
