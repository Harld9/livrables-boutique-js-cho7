/*
 * On définit ici toutes les routes liées aux utilisateurs.
 * On fait le lien entre les URLs et les fonctions du controller utilisateur.
 * On n'écrit pas de logique ici — on se contente de brancher les routes.
 */

const express     = require('express')
const router      = express.Router()

// On importe le controller qui contient toute la logique métier
const utilisateur = require('../controller/utilisateur')

// On branche la route POST /api/inscription sur la fonction d'inscription
router.post('/inscription', utilisateur.inscrireClient)

// On branche la route POST /api/connexion sur la fonction de connexion
router.post('/connexion', utilisateur.connecterClient)

// On branche la route favoris — à compléter plus tard
// On retire le /api/ ici — il est déjà ajouté dans app.js via app.use('/api', utilisateurRouter)
router.get('/utilisateur/favoris', utilisateur.getUtilisateurFavoris)

// On branche la route GET /api/utilisateur/:id sur la fonction de récupération
router.get('/utilisateur/:id', utilisateur.getUtilisateurById)

module.exports = router