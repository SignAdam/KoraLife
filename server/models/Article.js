import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  publishedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  images: [{ type: String }],
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  shares: { type: Number, default: 0 }
});

articleSchema.virtual('likes').get(function () {
  return this.likedBy.length;
});

articleSchema.set('toJSON', { virtuals: true });
articleSchema.set('toObject', { virtuals: true });

export default mongoose.model('Article', articleSchema);

