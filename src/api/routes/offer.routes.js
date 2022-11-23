const express = require('express')
const router = express.Router()
const {isAuth} = require('../../middlewares/auth');

const {getAllOffers, getOffer, getOfferById, deleteOffer} = require('../controllers/Offer.controller')

router.post('/getAllOffers', [isAuth], getAllOffers);
router.post('/getOffer', [isAuth], getOffer);
router.post('/getOffer/id', [isAuth], getOfferById);
router.put('/', [isAuth], deleteOffer);

module.exports = router;