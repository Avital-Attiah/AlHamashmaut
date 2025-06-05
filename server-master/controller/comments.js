import {
  addComment,
  deleteComment,
  updateComment,
  getComments,
  getCommentById
} from '../service/commentData.js';

import { getepisodesByIdController } from './episodes.js';

export class CommentController {
  // שליפת כל התגובות לפי episodeId (כשיש ?episodeId=...)
  getAll = async (req, res) => {
    const { episodeId } = req.query;
    try {
      if (!episodeId) {
        return res.status(400).json('חסר episodeId בשאילתא');
      }
      const response = await getComments(episodeId);
      return res.json(response);
    } catch (err) {
      console.error('Error in getAll:', err);
      return res.status(500).json(err.message);
    }
  }

  // הוספת תגובה חדשה
  add = async (req, res) => {
    try {
      const newComment = req.body;
      console.log('Request body הוספת תגובה:', newComment);

      // בדיקות בסיסיות: חייב להיות body + episodeId + userId (אם נדרש)
      if (
        !newComment ||
        !newComment.episodeId ||
        !newComment.body ||
        !newComment.userId  // אם אתה שולח את userId מאנטר בפרונטים
      ) {
        return res.status(400).json('נתוני תגובה חסרים או שגויים');
      }

      // הוספה למסד
      const commentId = await addComment(newComment);

      // מציבים את ה-id שהוחזר לתוך האובייקט ונחזיר ללקוח
      const created = { ...newComment, id: commentId };
      return res.status(201).json(created);

    } catch (error) {
      console.error('Error in add:', error);
      return res.status(500).json(error.message);
    }
  }

  // עדכון תגובה לפי מזהה (רק שדה ה-body)
  update = async (req, res) => {
    try {
      const id = req.params.id;
      const updateData = req.body;

      // בדיקה: חובה שיהיה body בעדכון (ואין צורך ב־episodeId או userId פה)
      if (!updateData || !updateData.body) {
        return res.status(400).json('נתוני תגובה חסרים או שגויים');
      }

      // אפשר לוודא שהתשובה באמת קיימת קודם (לא חובה, אבל מומלץ)
      const existingComment = await getCommentControlById(id);
      if (!existingComment) {
        return res.status(404).json('התגובה לא נמצאה');
      }

      // עדכון במסד
      await updateComment(id, updateData);
      console.log('עודכן בהצלחה comment id:', id);
      return res.status(200).json('פרטי התגובה עודכנו בהצלחה');

    } catch (error) {
      console.error('Error in update:', error);
      return res.status(500).json(error.message);
    }
  }

  // מחיקת תגובה לפי מזהה + בדיקת הרשאה (adminId של episode)
  delete = async (req, res) => {
    try {
      const commentId = req.params.id;

      // 1. נשלוף קודם את התגובה עצמה כדי לדעת מי episodeId
      const commentObj = await getCommentControlById(commentId);
      if (!commentObj) {
        return res.status(404).json('התגובה לא נמצאה');
      }

      // 2. נשלוף את הפרק (episode) לפי episodeId כדי לבדוק adminId
      const episode = await getepisodesByIdController(commentObj.episodeId);
      if (!episode) {
        console.log('בעיה בשליפת episode:', commentObj.episodeId);
        return res.status(404).json('הפרק לא נמצא');
      }

      // 3. נוודא שיש הרשאה: רק ה-admin של הפרק רשאי למחוק תגובה
      if (episode.adminId !== req.user.id) {
        console.log('אין הרשאה למחוק תגובה. משתמש:', req.user.id, 'adminId בפרק:', episode.adminId);
        return res.status(403).json('אין הרשאה למחוק תגובה זו');
      }

      // 4. אם עברנו את הבדיקות, נמחק את התגובה
      const wasDeleted = await deleteComment(commentId);
      if (wasDeleted) {
        console.log('תגובה נמחקה בהצלחה, commentId:', commentId);
        return res.status(200).json('התגובה נמחקה בהצלחה');
      } else {
        return res.status(404).json('התגובה לא נמצאה');
      }

    } catch (error) {
      console.error('Error in delete:', error);
      return res.status(500).json(error.message);
    }
  }
}


// פונקציית עזר לשליפת תגובה לפי id בלבד, מחזירה אובייקט או null
async function getCommentControlById(id) {
  try {
    const comment = await getCommentById(id);
    return comment || null;
  } catch (error) {
    console.error('Error in getCommentControlById:', error);
    throw error; // ייזרק הביתה ל־controller
  }
}
