
import { getMessagesForUser, markMessageAsRead, insertMessage ,countUnreadMessageData} from '../service/messageData.js';

export class MessageController {
  // שליפת הודעות למשתמש
  async getMessages(req, res) {
    try {
      const userId = req.user.id;
      const messages = await getMessagesForUser(userId);
      res.json(messages);
    } catch (err) {
      console.error('Error in getMessages:', err.message);
      res.status(500).json('שגיאה בשליפת הודעות');
    }
  }

  // שליחת הודעה למשתמש או לכולם
  async sendMessage(req, res) {
    try {
      const senderId = req.user.id;
      const { recipientId, commentId, body } = req.body;

      if (!body) return res.status(400).json('חסר תוכן ההודעה');

      await insertMessage({ senderId, recipientId, commentId, body });
      res.status(201).json({ success: true });
    } catch (err) {
      console.error('Error in sendMessage:', err.message);
      res.status(500).json('שגיאה בשליחת הודעה');
    }
  }

  // סימון הודעה כנקראה
  async markAsRead(req, res) {
    try {
      const msgId = req.params.id;
      await markMessageAsRead(msgId);
      res.json({ success: true });
    } catch (err) {
      console.error('Error in markAsRead:', err.message);
      res.status(500).json('Error');
    }
  }
  // now
  async countUnreadMessage(req ,res){
    try{
      const userId = req.user.id;
       const count=await countUnreadMessageData(userId);
        res.json({ count });
    }catch(err){
      console.error('Error in markAsRead:', err.message);
      res.status(500).json('Error');
    }
  }
}