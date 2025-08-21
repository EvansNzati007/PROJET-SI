const verifyRoles = (...rolesAutorises) => {
  return (req, res, next) => {
    if (!req?.user?.role) {
      console.log('Rôle manquant dans la requête : ');
      return res.status(401).json({ message: 'Accès non autorisé : rôle manquant' });
    }

    const userRole = req.user.role; // Une seule chaîne (ex. : "ETUDIANT")
    const rolesArrays = [...rolesAutorises];

    console.log('Rôles autorisés:', rolesArrays);
    console.log('Rôle utilisateur:', userRole);

    const isAuthorized = rolesArrays.includes(userRole);

    if (!isAuthorized) {
      console.log('Accès interdit : rôle non autorisé');
      return res.status(401).json({ message: 'Accès non autorisé : rôle non autorisé' });
    }

    next();
  };
};

module.exports = verifyRoles;