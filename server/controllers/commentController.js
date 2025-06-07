import Comment from '../models/Comment.js';

export const createComment = async (req, res) => {
  try {
    const comment = await Comment.create({
      content: req.body.content,
      author: req.user.id,
      article: req.params.articleId,
      parent: null
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Erreur création', error: err.message });
  }
};

export const replyToComment = async (req, res) => {
  try {
    const parentComment = await Comment.findById(req.params.parentId);
    if (!parentComment) return res.status(404).json({ message: 'Commentaire parent introuvable' });

    const reply = await Comment.create({
      content: req.body.content,
      author: req.user.id,
      article: parentComment.article,
      parent: parentComment._id
    });

    res.status(201).json(reply);
  } catch (err) {
    res.status(500).json({ message: 'Erreur réponse', error: err.message });
  }
};

export const getCommentsByArticle = async (req, res) => {
  try {
    const userId = req.user?.id;

    const comments = await Comment.find({ article: req.params.articleId })
      .populate('author', 'username')
      .sort({ publishedAt: 1 });

    const response = comments.map(comment => {
      const plain = comment.toObject();
      plain.hasLiked = userId ? comment.likedBy.includes(userId) : false;
      return plain;
    });

    res.json(response);
  } catch (err) {
    res.status(500).json({ message: 'Erreur récupération', error: err.message });
  }
};


export const updateComment = async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) return res.status(404).json({ message: 'Commentaire introuvable' });

  if (req.user.id !== comment.author.toString() && !req.user.isAdmin) {
    return res.status(403).json({ message: 'Action non autorisée' });
  }

  comment.content = req.body.content || comment.content;
  comment.updatedAt = new Date();
  await comment.save();

  res.json(comment);
};

export const deleteComment = async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) return res.status(404).json({ message: 'Commentaire introuvable' });

  if (req.user.id !== comment.author.toString() && !req.user.isAdmin) {
    return res.status(403).json({ message: 'Action non autorisée' });
  }

  await comment.deleteOne();
  res.json({ message: 'Commentaire supprimé' });
};

export const toggleLikeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Commentaire introuvable' });

    const userId = req.user.id;
    const alreadyLiked = comment.likedBy.includes(userId);

    if (alreadyLiked) {
      comment.likedBy.pull(userId);
    } else {
      comment.likedBy.push(userId);
    }

    await comment.save();

    res.json({
      message: alreadyLiked ? 'Like retiré' : 'Commentaire liké',
      likes: comment.likedBy.length
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur like', error: err.message });
  }
};