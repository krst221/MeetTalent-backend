const express = require('express')
const router = express.Router()
const {isAuth, isCompany} = require('../../middlewares/auth');

const {addOffer, closeOffer, getAllOffers, getOffer, getOfferById, deleteOffer} = require('../controllers/offer.controller')

router.get('/getAll', [isAuth], getAllOffers);
router.post('/add', [isCompany], addOffer);
router.post('/getOffer', [isAuth], getOffer);
router.post('/getOffer/id', [isAuth], getOfferById);
router.put('/close', [isCompany], closeOffer);
router.put('/', [isCompany], deleteOffer);

module.exports = router;