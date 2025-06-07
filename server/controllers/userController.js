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
