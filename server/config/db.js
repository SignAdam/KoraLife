import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connecté');
  } catch (err) {
    console.error('❌ Erreur de connexion à MongoDB:', err.message);
    process.exit(1); // Arrête le serveur en cas d'échec
  }
};

export default connectDB;
