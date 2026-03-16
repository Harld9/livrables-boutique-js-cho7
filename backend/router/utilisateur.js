const express = require('express')
const router = express.Router()
const utilisateurCont = require('../controller/utilisateur')

router.get('/utilisateur/:id', utilisateurCont.getUtilisateurById);
router.get('/utilisateur/favoris', utilisateurCont.getUtilisateurFavoris)

module.exports = router