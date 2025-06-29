
import pool from './database.js';

// שליפת הודעות עם פרטי השולח כולל התפקיד
export async function getMessagesForUser(userId) {
  const [rows] = await pool.query(`
    SELECT 
      m.*, 
      u.userName AS senderName, 
      u.profilePic, 
      ut.type AS senderRole
    FROM Messages m
    LEFT JOIN Users u ON m.senderId = u.id
    LEFT JOIN UserTypes ut ON u.userType = ut.id
    WHERE m.recipientId IS NULL OR m.recipientId = ?
    ORDER BY m.createdAt DESC
  `, [userId]);

  return rows;
}

// מחיקה אם השולח אינו מנהל, אחרת סימון כנקראה
export async function markMessageAsRead(id) {
  const [rows] = await pool.query(`
    SELECT ut.type AS senderRole
    FROM Messages m
    LEFT JOIN Users u ON m.senderId = u.id
    LEFT JOIN UserTypes ut ON u.userType = ut.id
    WHERE m.id = ?
  `, [id]);

  if (!rows[0]) throw new Error('הודעה לא נמצאה');

  if (rows[0].senderRole !== 'מנהל') {
    await pool.query('DELETE FROM Messages WHERE id = ?', [id]);
  } else {
    await pool.query('UPDATE Messages SET isRead = TRUE WHERE id = ?', [id]);
  }
}

export async function insertMessage({ senderId, recipientId, commentId, body }) {
  await pool.query(`
    INSERT INTO Messages (senderId, recipientId, commentId, body)
    VALUES (?, ?, ?, ?)
  `, [senderId || null, recipientId || null, commentId || null, body]);
}

export async function countUnreadMessageData(userId) {
  const [[{ count }]] = await pool.query(`
    SELECT COUNT(*) AS count FROM Messages
    WHERE (recipientId IS NULL OR recipientId = ?) AND isRead = FALSE
  `, [userId]);

  return count;
}

