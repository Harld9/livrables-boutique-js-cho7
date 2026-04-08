/*
 * On définit ici toutes les routes liées aux utilisateurs.
 * On fait le lien entre les URLs et les fonctions du controller utilisateur.
 * On n'écrit pas de logique ici — on se contente de brancher les routes.
 */

const express     = require('express')
const router      = express.Router()

// On importe le controller qui contient toute la logique métier
const utilisateur = require('../controller/utilisateur')

// lien entre la route inscription et le controller
router.post('/inscription', utilisateur.inscrireClient);
// lien entre la route conenxion et le controller
router.post('/connexion', utilisateur.connecterClient);

router.get('/api/utilisateur/:id', utilisateur.getUtilisateurById);
router.get('/api/utilisateur/favoris', utilisateur.getUtilisateurFavoris);

module.exports = router