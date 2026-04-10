/*
 * On définit ici les routes liées aux commandes.
 * On fait le lien entre les URLs et les fonctions du controller commande.
 */

const express           = require('express')
const router            = express.Router()
const commandeController = require('../controller/commande')

// On branche POST /api/commande → passe une nouvelle commande
router.post('/commande', commandeController.passerCommande)

// On branche GET /api/commandes → récupère les commandes du client connecté
router.get('/commandes', commandeController.getMesCommandes)

module.exports = router