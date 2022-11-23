const express = require('express')
const router = express.Router()
const {isAuth} = require('../../middlewares/auth');

const {register, login, getCompany, getCompanyById, logout, deleteCompany} = require('../controllers/company.controller')
router.post('/register', register);
router.post('/login', login);
router.post('/getCompany', [isAuth], getCompany);
router.post('/getCompany/id', [isAuth], getCompanyById);
router.post('/logout', logout);
router.put('/delete', [isAuth], deleteCompany);

module.exports = router;