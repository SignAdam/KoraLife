import Article from '../models/Article.js';

export const createArticle = async (req, res) => {
  try {
    const article = await Article.create({
      title: req.body.title,
      content: req.body.content,
      author: req.user.id,
      images: req.body.images || [],
      publishedAt: new Date(),
      updatedAt: new Date()
    });
    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

export const getAllArticles = async (req, res) => {
  const articles = await Article.find().populate('author', 'username email');
  res.json(articles);
};

export const getArticleById = async (req, res) => {
  const article = await Article.findById(req.params.id).populate('author', 'username email');
  if (!article) return res.status(404).json({ message: 'Article introuvable' });
  res.json(article);
};

export const updateArticle = async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) return res.status(404).json({ message: 'Article introuvable' });

  // Autorisation : auteur ou admin
  if (req.user.id !== article.author.toString() && !req.user.isAdmin) {
    return res.status(403).json({ message: 'Action non autorisée' });
  }

  article.title = req.body.title || article.title;
  article.content = req.body.content || article.content;
  article.images = req.body.images || article.images;
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
