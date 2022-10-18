const express = require('express')
const router = express.Router()

const {getAllGym, postGym, putGym, deleteGym} = require('../controllers/gimnasio.controller')

router.get('/', getAllGyms);
router.post('/', postGym)
router.put('/:id', putGym)
router.delete('/:id', deleteGym)

module.exports = router;