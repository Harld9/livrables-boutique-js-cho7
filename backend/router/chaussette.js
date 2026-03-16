const express = require('express')
const router = express.Router()
const chaussetteController = require('../controller/chaussette')

router.get('/chaussettes', chaussetteController.getChaussettes);
router.get('/chaussette/:id', chaussetteController.getChaussetteById)

module.exports = router