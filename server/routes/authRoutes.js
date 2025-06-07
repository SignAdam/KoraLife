import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/test', (req, res) => {
  res.send('✅ La route fonctionne');
});
export default router;