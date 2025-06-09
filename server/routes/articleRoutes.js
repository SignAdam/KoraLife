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
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// router.post('/', verifyToken, createArticle);
router.get('/', getAllArticles);
router.get('/:id', getArticleById);
router.put('/:id', verifyToken, updateArticle);
router.delete('/:id', verifyToken, deleteArticle);
router.put('/like/:id', verifyToken, toggleLikeArticle);
router.post('/', verifyToken, upload.array('images'), createArticle);
router.put('/:id', verifyToken, upload.array('images'), updateArticle);

export default router;
