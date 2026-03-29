const express = require('express');
const router = express.Router();

// import du controller
const authController = require('../controller/authController');

// lien entre la route inscription et le controller
router.post('/inscription', authController.inscrireClient);

module.exports = router;