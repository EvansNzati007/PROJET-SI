const express = require('express');
const router = express.Router();
const { createAbsence, getAbsences, reviewAbsence, validateAbsence, getStudents } = require('../controllers/AbsenceController');
const authMiddleware = require('../middlwares/auth.middleware'); // Ton middleware JWT
const  ROLES_LIST  = require('../config/rolesListes'); // Assurez-vous que ce chemin est correct
const verifyRoles = require('../middlwares/roles.middleware'); // Middleware pour vérifier les rôles
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

router.post('/', authMiddleware, verifyRoles(ROLES_LIST.ETUDIANT), upload.single('justification'), createAbsence);
router.get('/', authMiddleware, verifyRoles(ROLES_LIST.ETUDIANT, ROLES_LIST.SECRETAIRE, ROLES_LIST.CHEF_DE_DEPARTEMENT), getAbsences);
router.put('/:absenceId/review', authMiddleware, verifyRoles(ROLES_LIST.SECRETAIRE), reviewAbsence);
router.put('/:absenceId/validate', authMiddleware, verifyRoles(ROLES_LIST.CHEF_DE_DEPARTEMENT), validateAbsence);
router.get('/students', authMiddleware, verifyRoles(ROLES_LIST.SECRETAIRE, ROLES_LIST.CHEF_DE_DEPARTEMENT), getStudents);


module.exports = router;