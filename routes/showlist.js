const express = require('express')
const router = express.Router()
const showlistController = require('../controllers/showlist') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, showlistController.getShowlist)

router.post('/createShow', showlistController.createShow)

router.put('/markWatched', showlistController.markWatched)

router.put('/markUnwatched', showlistController.markUnwatched)

router.delete('/deleteShow', showlistController.deleteShow)

module.exports = router