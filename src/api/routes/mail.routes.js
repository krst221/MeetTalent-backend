const express = require('express')
const router = express.Router()
const {isAuth} = require('../../middlewares/auth');

const {getMail, logout, sendMail, deleteMail} = require('../controllers/mail.controller')

router.post('/getMail', getMail);
router.put('/', [isAuth], sendMail);
router.put('/delete', [isAuth], deleteMail);

module.exports = router;