
import pool from './database.js';

// פונקציה לשליפת כל הפוסטים
export const getAll = async (isFutureInterview) => {
  try {
    console.log(typeof isFutureInterview, isFutureInterview);
    const [rows] = await pool.query('SELECT * FROM episodes where isFutureInterview=?',[isFutureInterview]);
    return rows;
  } catch (error) {
    throw new Error('שגיאה בשאילתת נתונים');
  }
};
export const getEpisodesById = async (id) => {
  try {
    const [rows] = await pool.query('SELECT * FROM episodes where id=?',[id]);
    return rows[0];
  } catch (error) {
    throw new Error('שגיאה בשאילתת נתונים');
  }
};
// פונקציה להוספת פוסט חדש
export const addEpisode = async (episode) => {
    console.log(episode);
  const { title , body , adminId} = post;
  try {
    const [result] = await pool.query(
      'INSERT INTO episodes (title, body, adminId) VALUES (?, ?,?)',
      [title, body, adminId]
    );
    console.log("תוצאה מהדאטהבייס", result);
    return result.insertId;
  } catch (error) {
    throw new Error('שגיאה בהוספת נתונים');
  }
};
// פונקציה לעדכון פוסט לפי ID
export const updateEpisode = async (id, episode) => {
  const { title , body } = episode;
  try {
    const [result] = await pool.query(
      'UPDATE episodes SET body=?, title = ?  WHERE id = ?',
      [body,title, id]
    );
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error('שגיאה בעדכון נתונים');
  }
};
// פונקציה למחיקת פוסט לפי ID
export const deleteEpisode = async (id) => {
  try {
    const [result] = await pool.query('DELETE FROM episodes WHERE id = ?', [id]);
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error('שגיאה במחיקת נתונים');
  }
};
