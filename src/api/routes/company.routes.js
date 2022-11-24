const express = require('express')
const router = express.Router()
const {isCompany} = require('../../middlewares/auth');

const {register, getCompany, getCompanyById, deleteCompany} = require('../controllers/company.controller')

router.post('/register', register);
router.post('/getCompany', [isCompany], getCompany);
router.post('/getCompany/id', [isCompany], getCompanyById);
router.put('/delete', [isCompany], deleteCompany);

module.exports = router;