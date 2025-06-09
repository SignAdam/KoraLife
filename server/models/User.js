import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  isAdmin: { type: Boolean, default: false },
  profileImage: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  password: { type: String, required: true } // ⚠️ à ne pas oublier
});

export default mongoose.model('User', userSchema);
