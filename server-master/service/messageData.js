import pool from './database.js';

export async function getMessagesForUser(userId) {
  const [rows] = await pool.query(`
    SELECT m.*, u.userName AS senderName
    FROM Messages m
    LEFT JOIN Users u ON m.senderId = u.id
    WHERE m.recipientId IS NULL OR m.recipientId = ?
    ORDER BY m.createdAt DESC
  `, [userId]);
  return rows;
}

export async function markMessageAsRead(id) {
  await pool.query('UPDATE Messages SET isRead = TRUE WHERE id = ?', [id]);
}

export async function insertMessage({ senderId, recipientId, commentId, body }) {
  await pool.query(
    `INSERT INTO Messages (senderId, recipientId, commentId, body) VALUES (?, ?, ?, ?)`,
    [senderId || null, recipientId || null, commentId || null, body]
  );
}
