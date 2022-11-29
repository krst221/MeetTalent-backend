const express = require('express')
const router = express.Router()
const {isAuth} = require('../../middlewares/auth');

const {getMessage, sendMessage, deleteMessage} = require('../controllers/message.controller')

router.post('/get', [isAuth], getMessage);
router.put('/', [isAuth], sendMessage);
router.put('/delete', [isAuth], deleteMessage);

module.exports = router;