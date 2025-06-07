import express from 'express';
import {
  createComment,
  replyToComment,
  getCommentsByArticle,
  updateComment,
  deleteComment
} from '../controllers/commentController.js';
import { toggleLikeComment } from '../controllers/commentController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:articleId', verifyToken, createComment);
router.post('/reply/:parentId', verifyToken, replyToComment);
router.get('/article/:articleId', getCommentsByArticle);
router.put('/:id', verifyToken, updateComment);
router.delete('/:id', verifyToken, deleteComment);
router.put('/like/:id', verifyToken, toggleLikeComment);

export default router;
