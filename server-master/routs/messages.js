
import express from 'express';
import { MessageController } from '../controller/messages.js';
import { authenticateToken } from '../service/authMiddleware.js';

const router = express.Router();
const controller = new MessageController();

// קבלת כל ההודעות עבור המשתמש הנוכחי (כולל כלליות)
router.get('/', authenticateToken, controller.getMessages);

// שליחת הודעה (מנהל, מערכת, או משתמש רגיל)
router.post('/', authenticateToken, controller.sendMessage);

// סימון הודעה כנקראה
router.put('/:id/read', authenticateToken, controller.markAsRead);

router.get('/unread-count', authenticateToken,controller.countUnreadMessage);

export default router;