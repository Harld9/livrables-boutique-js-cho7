const express = require('express');
const router = express.Router();

// import du controller
const utilisateur = require('../controller/utilisateur');

// lien entre la route inscription et le controller
router.post('/inscription', utilisateur.inscrireClient);
// lien entre la route conenxion et le controller
router.post('/connexion', utilisateur.connecterClient);

router.get('/api/utilisateur/:id', utilisateur.getUtilisateurById);

module.exports = router;