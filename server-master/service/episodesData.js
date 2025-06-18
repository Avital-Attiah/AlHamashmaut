import pool from './database.js';

// שליפת כל הפוסטים
export const getAll = async (isFutureInterview) => {
  try {
    const [rows] = await pool.query('SELECT * FROM episodes WHERE isFutureInterview = ?', [isFutureInterview]);
    return rows;
  } catch (error) {
    throw new Error('שגיאה בשאילתת נתונים');
  }
};

// שליפת פרק לפי מזהה
export const getEpisodesById = async (id) => {
  try {
    const [rows] = await pool.query('SELECT * FROM episodes WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    throw new Error('שגיאה בשליפת נתונים');
  }
};

// הוספת פרק חדש
export const addEpisode = async (episode) => {
  const { title, body, adminId, picture } = episode;
  try {
    const [result] = await pool.query(
      'INSERT INTO episodes (title, body, adminId, picture) VALUES (?, ?, ?, ?)',
      [title, body, adminId, picture]
    );
    return result.insertId;
  } catch (error) {
    console.error(error);
    throw new Error('שגיאה בהוספת נתונים');
  }
};

// עדכון פרק קיים
export const updateEpisode = async (id, episode) => {
  const { title, body, picture } = episode;
  try {
    const [result] = await pool.query(
      'UPDATE episodes SET title = ?, body = ?, picture = ? WHERE id = ?',
      [title, body, picture, id]
    );
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error('שגיאה בעדכון נתונים');
  }
};

// מחיקת פרק
export const deleteEpisode = async (id) => {
  try {
    const [result] = await pool.query('DELETE FROM episodes WHERE id = ?', [id]);
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error('שגיאה במחיקת נתונים');
  }
};
