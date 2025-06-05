import pool from './database.js';

// שליפת תגובות
export const getComments = async (post_id) => {
  try {
    console.log('Getting comments for post_id:', post_id);
    
    const [rows] = await pool.query(
      'SELECT * FROM comments WHERE post_id = ?', 
      [post_id]
    );
    
    return rows;
  } catch (error) {
    console.error('SQL Error:', error);
    throw new Error('שגיאה בשאילתת תגובות');
  }
};
// הוספת תגובה
export const addComment = async (comment) => {
  const { body, post_id, name,email } = comment;
  try {
    const [result] = await pool.query(
      'INSERT INTO comments (body, post_id, name,email) VALUES (?, ?, ?,?)',
      [body, post_id, name,email]
    );
    return result.insertId;
  } catch (error) {
    throw new Error('שגיאה בהוספת תגובה');
  }
};

// עדכון תגובה לפי ID
export const updateComment = async (id, comment) => {
 const { body, name,email} = comment;
  try {
    const [result] = await pool.query(
      'UPDATE comments SET body = ?  ,name=?,email=? WHERE id = ?',
       [body,  name,email,id]
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



export const getCommentById = async (id) => {
  try {
    console.log('Getting comments for id:', id);
    
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