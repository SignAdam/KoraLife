import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null },
  publishedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

// Ajoute un champ virtuel pour compter les likes
commentSchema.virtual('likes').get(function () {
  return this.likedBy.length;
});

commentSchema.set('toJSON', { virtuals: true });
commentSchema.set('toObject', { virtuals: true });


export default mongoose.model('Comment', commentSchema);
