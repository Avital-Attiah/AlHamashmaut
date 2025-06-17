import {
  addComment,
  deleteComment,
  updateComment,
  getComments,
  getCommentById
} from '../service/commentData.js';

import { getepisodesByIdController } from './episodes.js';

export class CommentController {

  /**
   * 📥 Query: { episodeId: number }
   * 📤 Response: JSON array of comments for the given episode
   */
  getAll = async (req, res) => {
    const  episodeId  =  req.params.episodeId;
    console.log('Request query getAll comments:', req.query);
    console.log('episodeId:', episodeId);
    if (!episodeId) {
      console.log('episodeId is missing in query');
    }
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

  /**
   * 📥 Body: {
   *   body: string,
   *   episodeId: number,
   *   userId: number,
   *   connectedType?: 'episode' | 'comment',
   *   connectId?: number
   * }
   * 📤 Response: JSON of created comment with new id
   */
  add = async (req, res) => {
    try {
      const newComment = req.body;
      console.log('Request body הוספת תגובה:', newComment);

      if (
        !newComment ||
        !newComment.episodeId ||
        !newComment.body ||
        !newComment.userId
      ) {
        return res.status(400).json('נתוני תגובה חסרים או שגויים');
      }

      const commentId = await addComment(newComment);
      const created = { ...newComment, id: commentId };
      return res.status(201).json(created);

    } catch (error) {
      console.error('Error in add:', error);
      return res.status(500).json(error.message);
    }
  }

  /**
   * 📥 Params: { id: number }
   * 📥 Body: { body: string }
   * 📤 Response: string message on success or error
   */
  update = async (req, res) => {
    try {
      const id = req.params.id;
      const updateData = req.body;

      if (!updateData || !updateData.body) {
        return res.status(400).json('נתוני תגובה חסרים או שגויים');
      }

      const existingComment = await getCommentControlById(id);
      if (!existingComment) {
        return res.status(404).json('התגובה לא נמצאה');
      }

      await updateComment(id, updateData);
      console.log('עודכן בהצלחה comment id:', id);
      return res.status(200).json('פרטי התגובה עודכנו בהצלחה');

    } catch (error) {
      console.error('Error in update:', error);
      return res.status(500).json(error.message);
    }
  }

  /**
   * 📥 Params: { id: number }
   * 📥 Request user: req.user.id (admin ID)
   * 📤 Response: string success or error message
   * 🛡️ רק ה־admin של הפרק רשאי למחוק תגובה
   */
  delete = async (req, res) => {
    try {
      const commentId = req.params.id;

      const commentObj = await getCommentControlById(commentId);
      if (!commentObj) {
        return res.status(404).json('התגובה לא נמצאה');
      }

      const episode = await getepisodesByIdController(commentObj.episodeId);
      if (!episode) {
        console.log('בעיה בשליפת episode:', commentObj.episodeId);
        return res.status(404).json('הפרק לא נמצא');
      }

      if (episode.adminId !== req.user.id) {
        console.log('אין הרשאה למחוק תגובה. משתמש:', req.user.id, 'adminId בפרק:', episode.adminId);
        return res.status(403).json('אין הרשאה למחוק תגובה זו');
      }

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

/**
 * 📥 Input: id (number)
 * 📤 Output: comment object or null
 * פונקציית עזר לשליפת תגובה לפי ID
 */
async function getCommentControlById(id) {
  try {
    const comment = await getCommentById(id);
    return comment || null;
  } catch (error) {
    console.error('Error in getCommentControlById:', error);
    throw error;
  }
}
