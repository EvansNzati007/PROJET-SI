const AbsenceRequest = require('../models/AbsenceRequest');
const User = require('../models/User');
const { ETUDIANT, SECRETAIRE, CHEF_DE_DEPARTEMENT } = require('../config/rolesListes');

// Créer une demande d'absence (réservé aux étudiants)
const createAbsence = async (req, res) => {
  const { dateFrom, dateTo, reason } = req.body;
  const justification = req.file ? req.file.path : null; // Gérer le fichier uploadé
  const userId = req.user.id;

  if (!dateFrom || !dateTo || !reason) {
    return res.status(400).json({ message: 'Tous les champs (dateFrom, dateTo, reason) sont requis' });
  }

  try {
    const user = await User.findById(userId);
    if (!user || user.role !== 'ETUDIANT') {
      return res.status(403).json({ message: 'Seuls les étudiants peuvent créer une demande' });
    }

    if (new Date(dateFrom) >= new Date(dateTo)) {
      return res.status(400).json({ message: 'La date de début doit être antérieure à la date de fin' });
    }

    const absence = new AbsenceRequest({
      studentId: userId,
      dateFrom,
      dateTo,
      reason,
      justification,
      status: 'en_attente',
    });

    await absence.save();

    res.status(201).json({ message: 'Demande d\'absence créée avec succès', absence });
  } catch (error) {
    console.error('Erreur lors de la création de la demande:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// Lister les demandes d'absence
const getAbsences = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    let query = {};
    if (user.role === 'ETUDIANT') {
      query.studentId = userId; // Étudiant voit ses propres demandes
    } else if (user.role === 'SECRETAIRE' || user.role === 'CHEF_DE_DEPARTEMENT') {
      // Secrétaire et Chef voient toutes les demandes
    } else {
      return res.status(403).json({ message: 'Rôle non autorisé' });
    }

    const absences = await AbsenceRequest.find(query)
      .populate('studentId', 'username email')
      .populate('approvedBy', 'username')
      .populate('secretaryReviewedBy', 'username');

    res.status(200).json(absences);
  } catch (error) {
    console.error('Erreur lors de la récupération des absences:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// Revoir une demande (réservé aux secrétaires)
const reviewAbsence = async (req, res) => {
  const { absenceId } = req.params;
  const { comments, status } = req.body;
  const userId = req.user.id;

  if (!['prete_pour_validation', 'refusee'].includes(status)) {
    return res.status(400).json({ message: 'Statut invalide' });
  }

  try {
    const user = await User.findById(userId);
    if (!user || user.role !== 'SECRETAIRE') {
      return res.status(403).json({ message: 'Seule une secrétaire peut revoir une demande' });
    }

    const absence = await AbsenceRequest.findById(absenceId);
    if (!absence) {
      return res.status(404).json({ message: 'Demande non trouvée' });
    }

    if (absence.status !== 'en_attente') {
      return res.status(400).json({ message: 'Cette demande a déjà été traitée' });
    }

    absence.status = status;
    absence.comments = comments || absence.comments;
    absence.secretaryReviewedBy = userId;
    absence.updatedAt = Date.now();

    await absence.save();

    res.status(200).json({ message: 'Demande mise à jour avec succès', absence });
  } catch (error) {
    console.error('Erreur lors de la révision de la demande:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// Valider ou refuser une demande (réservé aux chefs de département)
const validateAbsence = async (req, res) => {
  const { absenceId } = req.params;
  const { status } = req.body;
  const userId = req.user.id;

  if (!['validee', 'refusee'].includes(status)) {
    return res.status(400).json({ message: 'Statut invalide' });
  }

  try {
    const user = await User.findById(userId);
    if (!user || user.role !== 'CHEF_DE_DEPARTEMENT') {
      return res.status(403).json({ message: 'Seul un chef de département peut valider/refuser' });
    }

    const absence = await AbsenceRequest.findById(absenceId);
    if (!absence) {
      return res.status(404).json({ message: 'Demande non trouvée' });
    }

    if (absence.status !== 'prete_pour_validation') {
      return res.status(400).json({ message: 'Cette demande n\'est pas prête pour validation' });
    }

    absence.status = status;
    absence.approvedBy = userId;
    absence.updatedAt = Date.now();

    await absence.save();

    res.status(200).json({ message: `Demande ${status} avec succès`, absence });
  } catch (error) {
    console.error('Erreur lors de la validation de la demande:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// Lister les étudiants (réservé aux secrétaires et chefs de département)
const getStudents = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    if (!user || !['SECRETAIRE', 'CHEF_DE_DEPARTEMENT'].includes(user.role)) {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    const students = await User.find({ role: 'ETUDIANT' }).select('username email');
    res.status(200).json(students);
  } catch (error) {
    console.error('Erreur lors de la récupération des étudiants:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

module.exports = {
  createAbsence,
  getAbsences,
  reviewAbsence,
  validateAbsence,
  getStudents,
};