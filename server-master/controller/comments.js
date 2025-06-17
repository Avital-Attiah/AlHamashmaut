import {
  addComment,
  deleteComment,
  updateComment,
  getComments,
  getCommentById,
  getCommentsByConnectId
} from '../service/commentData.js';

import { getEpisodesById } from '../service/episodesData.js';


export class CommentController {

  /**
   * 📥 Query: { episodeId: number }
   * 📤 Response: JSON array of comments for the given episode
   */
  getAll = async (req, res) => {
    const episodeId = req.params.episodeId;
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

  getByConnectId = async (req, res) => {
    try {
      const connectId = req.params.id;
      const replies = await getCommentsByConnectId(connectId); // ← from commentData.js
      res.json(replies);
    } catch (err) {
      console.error("Error in getByConnectId:", err.message);
      res.status(500).json("שגיאה בשליפת תגובות לתגובה");
    }
  };


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
  // add = async (req, res) => {
  //   try {
  //     const { episodeId, body, connectedType, connectId } = req.body;
  //     const userId = req.user.id;

  //     if (!episodeId || !body) {
  //       return res.status(400).json('נתוני תגובה חסרים או שגויים');
  //     }

  //     // מוסיפים למסד את התגובה
  //     const commentId = await addComment({
  //       body,
  //       episodeId,
  //       connectedType: connectedType || 'episode',
  //       connectId: connectId ?? null,
  //       userId
  //     });

  //     // מחזירים ללקוח את התגובה החדשה כולל userId ו-id
  //     const created = { id: commentId, episodeId, body, connectedType, connectId, userId };
  //     return res.status(201).json(created);

  //   } catch (error) {
  //     console.error('Error in add:', error.message);
  //     return res.status(500).json(error.message);
  //   }
  // };
add = async (req, res) => {
  try {
    const newComment = req.body;

    if (!newComment || !newComment.episodeId || !newComment.body || !req.user?.id) {
      return res.status(400).json('נתוני תגובה חסרים או שגויים');
    }

    // הוספת המשתמש מתוך הטוקן
    const fullComment = {
      ...newComment,
      userId: req.user.id
    };

    const commentId = await addComment(fullComment);

    // ❗ נשלוף את התגובה מהמסד כדי לכלול createdAt
    const created = await getCommentById(commentId);
    return res.status(201).json(created);

  } catch (error) {
    console.error('Error in add:', error.message);
    return res.status(500).json(error.message);
  }
};

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
      if (existingComment.userId !== req.user.id) {
        return res.status(403).json('אין הרשאה לעדכן תגובה זו');
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

    const commentObj = await getCommentById(commentId);
    if (!commentObj) {
      return res.status(404).json('התגובה לא נמצאה');
    }

    const episode = await getEpisodesById(commentObj.episodeId); // ✅
    if (!episode) {
      return res.status(404).json('הפרק לא נמצא');
    }

    if (episode.adminId !== req.user.id && commentObj.userId !== req.user.id) {
      return res.status(403).json('אין הרשאה למחוק תגובה זו');
    }

    const wasDeleted = await deleteComment(commentId);
    if (wasDeleted) {
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


