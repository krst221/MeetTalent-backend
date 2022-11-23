const express = require('express')
const router = express.Router()
const {isAuth, isCompany} = require('../../middlewares/auth');

const {addOffer, getAllOffers, getOffer, getOfferById, deleteOffer} = require('../controllers/Offer.controller')

router.get('/getAllOffers', [isAuth], getAllOffers);
router.post('/', [isCompany], addOffer);
router.post('/getOffer', [isAuth], getOffer);
router.post('/getOffer/id', [isAuth], getOfferById);
router.put('/', [isCompany], deleteOffer);

module.exports = router;