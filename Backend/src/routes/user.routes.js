const express = require('express');
const router = express.Router();
const { register, createUserByAdmin, updateUser, getUser } = require('../controllers/userController');
const authMiddleware = require('../middlwares/auth.middleware');
const verifyRoles = require('../middlwares/roles.middleware');
const ROLES_LIST = require('../config/rolesListes');

router.post('/register', register);
router.post('/admin/create', authMiddleware, verifyRoles(ROLES_LIST.CHEF_DE_DEPARTEMENT), createUserByAdmin);
router.get('/me', authMiddleware, verifyRoles(ROLES_LIST.ETUDIANT, ROLES_LIST.SECRETAIRE, ROLES_LIST.CHEF_DE_DEPARTEMENT), getUser);
router.put('/update', authMiddleware, verifyRoles(ROLES_LIST.ETUDIANT, ROLES_LIST.SECRETAIRE, ROLES_LIST.CHEF_DE_DEPARTEMENT), updateUser);

module.exports = router;