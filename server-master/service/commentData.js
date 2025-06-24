import pool from './database.js';
import { insertMessage } from './messageData.js';

// שליפת תגובות
export const getComments = async (episodeId) => {
   try {
    console.log('Getting comments for episodeId:', episodeId);

    const [rows] = await pool.query(
  `SELECT c.*, u.userName, ut.type AS userType
   FROM comments c
   JOIN Users u ON c.userId = u.id
   JOIN UserTypes ut ON u.userType = ut.id
   WHERE c.episodeId = ?`,
  [episodeId]
);


    return rows;
  } catch (error) {
    console.error('SQL Error:', error);
    throw new Error('שגיאה בשאילתת תגובות');
  }
};

// הוספת תגובה
//  const saveCommentToDb = async (comment) => {
//   const { body, episodeId, connectedType, connectId, userId, isQuestion = false } = comment;
//   try {
//     const [result] = await pool.query(
//       'INSERT INTO comments (body, episodeId, connectedType, connectId, userId, isQuestion) VALUES (?, ?, ?, ?, ?, ?)',
//       [body, episodeId, connectedType, connectId, userId, isQuestion]
//     );
//     return result.insertId;
//   } catch (error) {
//     console.error("🔴 שגיאה בהוספת תגובה:", error.message);
//     throw new Error('שגיאה בהוספת תגובה');
//   }
// };


 const notifyCommentRecipient = async (commentId, { body, episodeId, connectedType, connectId, userId }) => {
  try {
    let recipientId = null;

    if (connectedType === 'comment' && connectId) {
      const [[parentComment]] = await pool.query('SELECT userId FROM Comments WHERE id = ?', [connectId]);
      if (parentComment && parentComment.userId !== userId) {
        recipientId = parentComment.userId;
      }
    } else {
      const [[episode]] = await pool.query('SELECT adminId FROM Episodes WHERE id = ?', [episodeId]);
      if (episode && episode.adminId !== userId) {
        recipientId = episode.adminId;
      }
    }

    if (recipientId) {
      await insertMessage({ senderId: userId, recipientId, commentId, body });
    }
  } catch (error) {
    console.error("🔴 שגיאה בשליחת הודעה על תגובה:", error.message);
    // בכוונה לא זורקים שגיאה כדי שהתגובה תישמר גם אם ההודעה לא הצליחה
  }
};

const saveCommentToDb = async ({ body, episodeId, connectedType, connectId, userId, isQuestion = false }) => {
  try {
    const [result] = await pool.query(
      'INSERT INTO comments (body, episodeId, connectedType, connectId, userId, isQuestion) VALUES (?, ?, ?, ?, ?, ?)',
      [body, episodeId, connectedType, connectId, userId, isQuestion]
    );
    return result.insertId;
  } catch (error) {
    console.error("🔴 שגיאה בשמירת תגובה:", error.message);
    throw new Error('שגיאה בשמירת תגובה');
  }
};
export const addComment = async (comment) => {
  const commentId = await saveCommentToDb(comment);
  await notifyCommentRecipient(commentId, comment);
  return commentId;
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
  `SELECT c.*, u.userName, ut.type AS userType
   FROM comments c
   JOIN Users u ON c.userId = u.id
   JOIN UserTypes ut ON u.userType = ut.id
   WHERE c.connectId = ?`,
  [connectId]
);


    return rows;
  } catch (error) {
    console.error('SQL Error:', error);
    throw new Error('שגיאה בשאילתת תגובות לפי connectId');
  }
};
