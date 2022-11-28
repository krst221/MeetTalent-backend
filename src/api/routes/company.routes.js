const express = require('express')
const router = express.Router()
const {isAuth, isCompany} = require('../../middlewares/auth');

const {register, getCompanyName, getCompanyById, deleteCompany} = require('../controllers/company.controller')

router.post('/register', register);
router.post('/get', [isAuth], getCompanyName);
router.post('/get/id', [isAuth], getCompanyById);
router.put('/delete', [isCompany], deleteCompany);

module.exports = router;