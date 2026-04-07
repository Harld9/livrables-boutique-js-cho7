// Importe express
const express = require('express')
// On crée une instance de router
const router = express.Router()
// On importe (require) le fichier controller (backend)
const chaussetteController = require('../controller/chaussette')

// ====== ROUTES ======
// ----- API/CHAUSSETTES ------
// On écoute appel GET sur /chaussettes et appel la fonction getChaussettes du controller
// On appel la référence de la focntion (Express appellera la fonction au bon moment) et non
// le résultat de la fonction (getAll() -- la fonction s'exécute immédiatement au démarrage)
router.get('/chaussettes', chaussetteController.getChaussettes);
// ----- API/CHAUSSETTE/:ID ------
router.get('/chaussette/:id', chaussetteController.getChaussetteById)
// ----- api/chaussettes/variantes/:id ------
router.get('/chaussettes/variantes/:id', chaussetteController.getVariantes)
// ----- api/chaussettes/similaires/:id ------
router.get('/chaussettes/similaires/:id', chaussetteController.getSimilaires)

// On exporte le router avec ses routes pour que app.js puisse les utiliser (require)
module.exports = router