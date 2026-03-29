const express = require('express');
const router = express.Router();

// import du controller
const inscription = require('../controller/inscription');

// lien entre la route inscription et le controller
router.post('/inscription',  inscription.inscrireClient);

module.exports = router;