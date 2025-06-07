import express from 'express';
import {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  toggleLikeArticle
} from '../controllers/articleController.js';

import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, createArticle);
router.get('/', getAllArticles);
router.get('/:id', getArticleById);
router.put('/:id', verifyToken, updateArticle);
router.delete('/:id', verifyToken, deleteArticle);
router.put('/like/:id', verifyToken, toggleLikeArticle);

export default router;
