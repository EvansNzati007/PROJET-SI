const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL); // Connexion sans options obsolètes
       // console.log('Connexion réussie à la base de données');
    } catch (error) {
        console.error('Erreur de connexion à la base de données:', error);
    }
};

module.exports = connectDB;