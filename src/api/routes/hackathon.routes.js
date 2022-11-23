const express = require('express')
const router = express.Router()
const {isAuth} = require('../../middlewares/auth');

const {getHack, getHackById, deleteHack} = require('../controllers/hackathon.controller')

router.post('/getHack', [isAuth], getHack);
router.post('/getHack/id', [isAuth], getHackById);
router.put('/', [isAuth], deleteHack);

module.exports = router;