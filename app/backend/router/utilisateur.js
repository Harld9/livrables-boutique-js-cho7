const express = require('express')
const router = express.Router()
const utilisateurCont = require('../controller/utilisateur')

router.get('/api/utilisateur/:id', utilisateurCont.getUtilisateurById);
router.get('/api/utilisateur/favoris', utilisateurCont.getUtilisateurFavoris);

module.exports = router