const express = require('express')
const router = express.Router()
const {isAuth} = require('../../middlewares/auth');

const {register, login, getUser, getUserById, joinOffer, getAllUsers, logout, putUser, putUserValue, putUserArray, emailExists, changePassword, deleteUser} = require('../controllers/user.controller')

router.get('/', [isAuth], getAllUsers);
router.post('/register', register);
router.post('/login', login);
router.post('/mail', emailExists);
router.post('/getUser', [isAuth], getUser);
router.post('/getUser/id', [isAuth], getUserById);
router.post('/join', [isAuth], joinOffer);
router.post('/logout', logout);
router.put('/edit', [isAuth], putUser);
router.put('/editValue', [isAuth], putUserValue);
router.put('/editArray', [isAuth], putUserArray);
router.put('/change', changePassword);
router.put('/delete', [isAuth], deleteUser);

module.exports = router;