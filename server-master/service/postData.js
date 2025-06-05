
import pool from './database.js';

// פונקציה לשליפת כל הפוסטים
export const getAll = async () => {
  try {
   const baseQuery = 'SELECT * FROM posts';
    // const fullQuery = whereClause!='' ? `${baseQuery} ${whereClause}` : baseQuery;
    const [rows] = await pool.query(baseQuery);
    return rows;
  } catch (error) {
    throw new Error('שגיאה בשאילתת נתונים');
  }
};
export const getPostById = async (id) => {
  try {
    const [rows] = await pool.query('SELECT * FROM posts where id=?',[id]);
    return rows[0];
  } catch (error) {
    throw new Error('שגיאה בשאילתת נתונים');
  }
};
// פונקציה להוספת פוסט חדש
export const addPost = async (post) => {
    console.log(post);
  const { title , body , user_id} = post;
  try {
    const [result] = await pool.query(
      'INSERT INTO posts (title, body, user_id) VALUES (?, ?,?)',
      [title, body, user_id]
    );
    console.log("תוצאה מהדאטהבייס", result);
    return result.insertId;
  } catch (error) {
    throw new Error('שגיאה בהוספת נתונים');
  }
};
// פונקציה לעדכון פוסט לפי ID
export const updatePost = async (id, post) => {
  const { title , body } = post;
  try {
    const [result] = await pool.query(
      'UPDATE posts SET body=?, title = ?  WHERE id = ?',
      [body,title, id]
    );
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error('שגיאה בעדכון נתונים');
  }
};
// פונקציה למחיקת פוסט לפי ID
export const deletePost = async (id) => {
  try {
    const [result] = await pool.query('DELETE FROM posts WHERE id = ?', [id]);
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error('שגיאה במחיקת נתונים');
  }
};
