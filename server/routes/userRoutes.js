import express from 'express';
import { getUsers, getUser, updateUser, deleteUser } from '../controllers/userController.js';
import { verifyToken, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, requireAdmin, getUsers);
router.get('/:id', verifyToken, getUser);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, requireAdmin, deleteUser);

export default router;
