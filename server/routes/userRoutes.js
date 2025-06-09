import express from 'express';
import { getUsers, getUser, updateUser, deleteUser } from '../controllers/userController.js';
import { verifyToken, requireAdmin } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
import { updateProfileImage } from '../controllers/userController.js';

const router = express.Router();

router.get('/', verifyToken, requireAdmin, getUsers);
router.get('/:id', verifyToken, getUser);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, requireAdmin, deleteUser);
router.put('/upload/:id', verifyToken, upload.single('profile'), updateProfileImage);

export default router;
