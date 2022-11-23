const express = require('express')
const router = express.Router()
const {isCompany} = require('../../middlewares/auth');

const {register, login, getCompany, getCompanyById, logout, deleteCompany} = require('../controllers/company.controller')

router.post('/register', register);
router.post('/login', login);
router.post('/getCompany', [isCompany], getCompany);
router.post('/getCompany/id', [isCompany], getCompanyById);
router.post('/logout', logout);
router.put('/delete', [isCompany], deleteCompany);

module.exports = router;