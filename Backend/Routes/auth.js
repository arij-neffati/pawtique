const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Import du modèle utilisateur

const router = express.Router();

// Route POST pour /api/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Rechercher l'utilisateur par nom d'utilisateur
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Utilisateur non trouvé' });
    }

    // Vérifier si le mot de passe est correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Mot de passe incorrect' });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      'votre_clé_secrète', // Remplacez par une clé secrète sécurisée
      { expiresIn: '1h' }
    );

    // Répondre avec le token
    res.json({ message: 'Connexion réussie', token });
  } catch (err) {
    res.status(500).json({ error: 'Erreur du serveur', details: err.message });
  }
});

module.exports = router;