const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashé avec bcrypt
  email: { type: String, required: true, unique: true },
  role: { 
    type: String, 
    enum: ['ETUDIANT', 'SECRETAIRE', 'CHEF_DE_DEPARTEMENT'], 
    required: true ,
    default: 'ETUDIANT'
  },
  refreshToken: { type: String }, // Pour JWT refresh
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);