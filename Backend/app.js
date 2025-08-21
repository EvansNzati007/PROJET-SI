require('dotenv').config();
  const express = require('express');
  const mongoose = require('mongoose');
  const bodyParser = require('body-parser');
  const cors = require('cors');

  const connectDB = require('./src/config/db');
  const userRoutes = require('./src/routes/user.routes');
  const absenceRoutes = require('./src/routes/Abscence.routes');
  const authRoutes = require('./src/routes/auth.routes');
  const corsOptions = require('./src/config/corsOptions');
  const path = require('path');

  const server = express();

  server.use(express.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(cors(corsOptions));

  // Servir les fichiers statiques du dossier Uploads
server.use('/api/Uploads', express.static(path.join(__dirname, 'Uploads')));

  server.use('/api/users', userRoutes);
  server.use('/api/absences', absenceRoutes);
  server.use('/api/auth', authRoutes);

  connectDB();

  mongoose.connection.once('open', () => {
    console.log('Connexion réussie à MongoDB');
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(`Server listening on port: ${PORT}`);
    });
  });

  mongoose.connection.on('error', (err) => {
    console.error('Erreur de connexion MongoDB:', err);
  });

  module.exports = server;