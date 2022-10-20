const express = require('express')
const router = express.Router()
const {isAuth} = require('../../middlewares/auth');

const {getAllGyms, getIdGym, getNameGym, register, login, logout, putGym, deleteGym} = require('../controllers/gimnasio.controller')

router.get('/', [isAuth], getAllGyms);
router.get('/:id', [isAuth], getIdGym);
router.get('/:name', [isAuth], getNameGym);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.put('/:id', [isAuth], putGym);
router.delete('/:id', [isAuth], deleteGym);

module.exports = router;