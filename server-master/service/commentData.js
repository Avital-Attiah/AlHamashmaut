import pool from './database.js';

// שליפת תגובות
export const getComments = async (episodeId) => {
  try {
    console.log('Getting comments for episodeId:', episodeId);
    
    const [rows] = await pool.query(
      'SELECT * FROM comments WHERE episodeId = ?', 
      [episodeId]
    );
    
    return rows;
  } catch (error) {
    console.error('SQL Error:', error);
    throw new Error('שגיאה בשאילתת תגובות');
  }
};

// הוספת תגובה
export const addComment = async (comment) => {
  const { body, episodeId, connectedType, connectId, userId } = comment; // ✅ הוספנו userId
  try {
    const [result] = await pool.query(
      'INSERT INTO comments (body, episodeId, connectedType, connectId, userId) VALUES (?, ?, ?, ?, ?)',
      [body, episodeId, connectedType, connectId, userId] // ✅ הוספנו userId לבסיס הנתונים
    );
    return result.insertId;
  } catch (error) {
    console.error("🔴 שגיאה בהוספת תגובה:", error.message); // להדפיס את השגיאה האמיתית!
    throw new Error('שגיאה בהוספת תגובה');
  }
};

// עדכון תגובה לפי ID
export const updateComment = async (id, comment) => {
  const { body } = comment;
  try {
    const [result] = await pool.query(
      'UPDATE comments SET body = ? WHERE id = ?',
      [body, id]
    );
    return result;
  } catch (error) {
    throw new Error('שגיאה בעדכון תגובה');
  }
};

// מחיקת תגובה לפי ID
export const deleteComment = async (id) => {
  try {
    const [result] = await pool.query('DELETE FROM comments WHERE id = ?', [id]);
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error('שגיאה במחיקת תגובה');
  }
};

// שליפת תגובה לפי ID
export const getCommentById = async (id) => {
  try {
    console.log('Getting comment for id:', id);

    const [rows] = await pool.query(
      'SELECT * FROM comments WHERE id = ?', 
      [id]
    );

    return rows[0];
  } catch (error) {
    console.error('SQL Error:', error);
    throw new Error('שגיאה בשאילתת תגובות');
  }
};

// שליפת תגובות לפי connectId (תגובות תשובות לתגובה)
export const getCommentsByConnectId = async (connectId) => {
  try {
    console.log('Getting comments for connectId:', connectId);

    const [rows] = await pool.query(
      'SELECT * FROM comments WHERE connectId = ?',
      [connectId]
    );

    return rows;
  } catch (error) {
    console.error('SQL Error:', error);
    throw new Error('שגיאה בשאילתת תגובות לפי connectId');
  }
};
