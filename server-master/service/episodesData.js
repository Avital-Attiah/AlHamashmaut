// import pool from './database.js';

// // שליפת כל הפוסטים
// export const getAll = async (isFutureInterview) => {
//   try {
//     const [rows] = await pool.query('SELECT * FROM episodes WHERE isFutureInterview = ?', [isFutureInterview]);
//     return rows;
//   } catch (error) {
//     throw new Error('שגיאה בשאילתת נתונים');
//   }
// };

// // שליפת פרק לפי מזהה
// export const getEpisodesById = async (id) => {
//   try {
//     const [rows] = await pool.query('SELECT * FROM episodes WHERE id = ?', [id]);
//     return rows[0];
//   } catch (error) {
//     throw new Error('שגיאה בשליפת נתונים');
//   }
// };

// // הוספת פרק חדש
// export const addEpisode = async (episode) => {
//   const { title, body, adminId, picture } = episode;
//   try {
//     const [result] = await pool.query(
//       'INSERT INTO episodes (title, body, adminId, picture) VALUES (?, ?, ?, ?)',
//       [title, body, adminId, picture]
//     );
//     return result.insertId;
//   } catch (error) {
//     console.error(error);
//     throw new Error('שגיאה בהוספת נתונים');
//   }
// };

// // עדכון פרק קיים
// // export const updateEpisode = async (id, episode) => {
// //   const { title, body, picture } = episode;
// //   try {
// //     const [result] = await pool.query(
// //       'UPDATE episodes SET title = ?, body = ?, picture = ? WHERE id = ?',
// //       [title, body, picture, id]
// //     );
// //     return result.affectedRows > 0;
// //   } catch (error) {
// //     throw new Error('שגיאה בעדכון נתונים');
// //   }
// // };
// export const updateEpisode = async (id, episode) => {
//   const fields = [];
//   const values = [];

//   if (episode.title) {
//     fields.push("title = ?");
//     values.push(episode.title);
//   }
//   if (episode.body) {
//     fields.push("body = ?");
//     values.push(episode.body);
//   }
//   if (episode.picture) {
//     fields.push("picture = ?");
//     values.push(episode.picture);
//   }
//   if (episode.hasOwnProperty("isFutureInterview")) {
//     fields.push("isFutureInterview = ?");
//     values.push(episode.isFutureInterview ? 1 : 0);
//   }
//   if (episode.adminId) {
//     fields.push("adminId = ?");
//     values.push(episode.adminId);
//   }

//   if (fields.length === 0) return false;

//   const query = `UPDATE episodes SET ${fields.join(", ")} WHERE id = ?`;
//   values.push(id);

//   try {
//     const [result] = await pool.query(query, values);
//     return result.affectedRows > 0;
//   } catch (error) {
//     console.error("DB update error:", error.message);
//     throw new Error("שגיאה בעדכון הנתונים");
//   }
// };

// // מחיקת פרק
// export const deleteEpisode = async (id) => {
//   try {
//     const [result] = await pool.query('DELETE FROM episodes WHERE id = ?', [id]);
//     return result.affectedRows > 0;
//   } catch (error) {
//     throw new Error('שגיאה במחיקת נתונים');
//   }
// };


// -------------------- SERVICE --------------------
import pool from './database.js';

/**
 * 📥 Query: { isFutureInterview: boolean }
 * 📤 Response: Array of episode objects
 */
export const getAll = async (isFutureInterview) => {
  try {
    const [rows] = await pool.query('SELECT * FROM episodes WHERE isFutureInterview = ?', [isFutureInterview]);
    return rows;
  } catch (error) {
    throw new Error('שגיאה בשאילתת נתונים');
  }
};

/**
 * 📥 Params: { id: number }
 * 📤 Response: episode object
 */
export const getEpisodesById = async (id) => {
  try {
    const [rows] = await pool.query('SELECT * FROM episodes WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    throw new Error('שגיאה בשליפת נתונים');
  }
};

/**
 * 📥 Body: { title, body, adminId, picture, isFutureInterview }
 * 📤 Response: new episode ID
 */
export const addEpisode = async (episode) => {
  const { title, body, adminId, picture, isFutureInterview } = episode;
  try {
    const [result] = await pool.query(
      'INSERT INTO episodes (title, body, adminId, picture, isFutureInterview) VALUES (?, ?, ?, ?, ?)',
      [title, body, adminId, picture, isFutureInterview ? 1 : 0]
    );
    return result.insertId;
  } catch (error) {
    console.error(error);
    throw new Error('שגיאה בהוספת נתונים');
  }
};

/**
 * 📥 Params: { id: number }
 * 📥 Body: partial episode fields
 * 📤 Response: true if updated, false otherwise
 */
export const updateEpisode = async (id, episode) => {
  const fields = [];
  const values = [];

  if (episode.title) {
    fields.push("title = ?");
    values.push(episode.title);
  }
  if (episode.body) {
    fields.push("body = ?");
    values.push(episode.body);
  }
  if (episode.picture) {
    fields.push("picture = ?");
    values.push(episode.picture);
  }
  if (episode.hasOwnProperty("isFutureInterview")) {
    fields.push("isFutureInterview = ?");
    values.push(episode.isFutureInterview ? 1 : 0);
  }
  if (episode.adminId) {
    fields.push("adminId = ?");
    values.push(episode.adminId);
  }

  if (fields.length === 0) return false;

  const query = `UPDATE episodes SET ${fields.join(", ")} WHERE id = ?`;
  values.push(id);

  try {
    const [result] = await pool.query(query, values);
    return result.affectedRows > 0;
  } catch (error) {
    console.error("DB update error:", error.message);
    throw new Error("שגיאה בעדכון הנתונים");
  }
};

/**
 * 📥 Params: { id: number }
 * 📤 Response: true if deleted, false otherwise
 */
export const deleteEpisode = async (id) => {
  try {
    const [result] = await pool.query('DELETE FROM episodes WHERE id = ?', [id]);
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error('שגיאה במחיקת נתונים');
  }
};