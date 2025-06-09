import User from '../models/User.js';

export const getUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

export const getUser = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
  res.json(user);
};

export const updateUser = async (req, res) => {
  const updates = req.body;
  if (updates.password) delete updates.password; // Sécurité
  const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
  res.json(user);
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'Utilisateur supprimé' });
};

export const updateProfileImage = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });

    if (req.user.id !== user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Action non autorisée' });
    }

    if (req.file) {
      user.profileImage = `/uploads/${req.file.filename}`;
      await user.save();
      res.json({ message: 'Image de profil mise à jour', profileImage: user.profileImage });
    } else {
      res.status(400).json({ message: 'Aucun fichier fourni' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
