/*
 * On définit ici toutes les routes liées aux chaussettes.
 * On fait le lien entre les URLs et les fonctions du controller chaussette.
 * On n'écrit pas de logique ici — on se contente de brancher les routes.
 */

// On importe Express pour créer le router
const express = require('express')
// On crée une instance de router — un mini Express dédié aux routes chaussettes
const router  = express.Router()
// On importe le controller qui contient toute la logique métier
const chaussetteController = require('../controller/chaussette')

// ===== ROUTES =====

// On branche GET /api/chaussettes → récupère toutes les chaussettes
// On passe la référence de la fonction — Express l'appellera au bon moment
// chaussetteController.getChaussettes   - v référence
// chaussetteController.getChaussettes() - X résultat — s'exécute au démarrage
router.get('/chaussettes', chaussetteController.getChaussettes)

// On branche GET /api/chaussette/:id → récupère une chaussette par son id
router.get('/chaussette/:id', chaussetteController.getChaussetteById)

// ! On place les routes spécifiques AVANT les routes dynamiques (:id)
// sinon Express interpréterait 'variantes' et 'similaires' comme des :id

// On branche GET /api/chaussettes/variantes/:id → récupère les variantes d'un produit
// (même longueur et même catégorie)
router.get('/chaussettes/variantes/:id', chaussetteController.getVariantes)

// On branche GET /api/chaussettes/similaires/:id → récupère les produits similaires
router.get('/chaussettes/similaires/:id', chaussetteController.getSimilaires)

// ----- API FAVORIS ------
router.post('/chaussettes/favoris', chaussetteController.toggleFavori);
router.get('/chaussettes/favoris', chaussetteController.getFavoris);

// On exporte le router avec ses routes pour que app.js puisse les utiliser (require)
module.exports = router