import Article from '../models/Article.js';

export const createArticle = async (req, res) => {
  try {
    const { title, content } = req.body;
    const images = req.files?.map(file => `/uploads/${file.filename}`) || [];
    console.log('BODY:', req.body);
    console.log('FILES:', req.files);
    const article = await Article.create({
      title,
      content,
      author: req.user.id,
      images,
      publishedAt: new Date(),
      updatedAt: new Date()
    });

    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ message: 'Erreur création', error: err.message });
  }
};


export const getAllArticles = async (req, res) => {
  const userId = req.user?.id;
  const articles = await Article.find().populate('author', 'username email');

  const response = articles.map(article => {
    const plain = article.toObject();
    plain.hasLiked = userId ? article.likedBy.includes(userId) : false;
    return plain;
  });

  res.json(response);
};

export const getArticleById = async (req, res) => {
  const article = await Article.findById(req.params.id).populate('author', 'username email');
  if (!article) return res.status(404).json({ message: 'Article introuvable' });

  const plain = article.toObject();
  plain.hasLiked = req.user?.id ? article.likedBy.includes(req.user.id) : false;

  res.json(plain);
};

export const updateArticle = async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) return res.status(404).json({ message: 'Article introuvable' });

  if (req.user.id !== article.author.toString() && !req.user.isAdmin) {
    return res.status(403).json({ message: 'Action non autorisée' });
  }

  const images = req.files?.map(file => `/uploads/${file.filename}`) || article.images;

  article.title = req.body.title || article.title;
  article.content = req.body.content || article.content;
  article.images = images;
  article.updatedAt = new Date();

  await article.save();
  res.json(article);
};

export const deleteArticle = async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) return res.status(404).json({ message: 'Article introuvable' });

  if (req.user.id !== article.author.toString() && !req.user.isAdmin) {
    return res.status(403).json({ message: 'Action non autorisée' });
  }

  await article.deleteOne();
  res.json({ message: 'Article supprimé' });
};

export const toggleLikeArticle = async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) return res.status(404).json({ message: 'Article introuvable' });

  const userId = req.user.id;
  const alreadyLiked = article.likedBy.includes(userId);

  if (alreadyLiked) {
    article.likedBy.pull(userId);
  } else {
    article.likedBy.push(userId);
  }

  await article.save();

  res.json({
    message: alreadyLiked ? 'Like retiré' : 'Article liké',
    likes: article.likedBy.length
  });
};

