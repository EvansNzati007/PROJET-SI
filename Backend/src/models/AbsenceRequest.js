const mongoose = require('mongoose');

const absenceRequestSchema = new mongoose.Schema({
  studentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }, // Référence à l'étudiant
  dateFrom: { type: Date, required: true },
  dateTo: { type: Date, required: true },
  reason: { type: String, required: true }, // Motif (ex. : maladie, rendez-vous)
  justification: { type: String }, // Lien vers fichier (ex. : URL d'un upload via Multer) ou texte
  status: { 
    type: String, 
    enum: ['en_attente', 'prete_pour_validation', 'validee', 'refusee'], 
    default: 'en_attente' 
  },
  comments: { type: String }, // Commentaires de la secrétaire
  approvedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }, // Référence au chef qui valide
  secretaryReviewedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }, // Référence à la secrétaire qui a consulté
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AbsenceRequest', absenceRequestSchema);