import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

import connectDB from './config/db.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/comments', commentRoutes);

connectDB(); // Connexion MongoDB ici

app.get('/', (req, res) => {
  res.send('API Koralife en ligne 🚀');
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`✅ Serveur lancé sur http://localhost:${PORT}`));

