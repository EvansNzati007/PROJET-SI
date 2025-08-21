const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ETUDIANT, SECRETAIRE, CHEF_DE_DEPARTEMENT } = require('../config/rolesListes');

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe invalide' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Email ou mot de passe invalide' });
    }

    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    console.log('AccessToken généré:', accessToken); // Log pour débogage
    console.log('UserInfo:', { id: user._id, username: user.username, email: user.email, role: user.role });

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'None',
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(200).json({
      message: 'Connexion réussie',
      accessToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { login };