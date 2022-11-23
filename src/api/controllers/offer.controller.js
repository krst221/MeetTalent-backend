const Offer = require('../models/offer.model');

const getAllOffers = async (req, res) => {
    try {
        const allOffers = await Offer.find();
        return res.status(200).json(allOffers);
    } catch (error) {
        return res.status(500).json(error)
    }
};

const getOffer = async (req, res) => {
    try {
        const OfferInfo = await Offer.findById(req.body._id);
        return res.status(200).json(OfferInfo);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getOfferById = async (req, res) => {
    try {
        const {Offer_send} = req.body;
        const OfferInfo = await Offer.findById(Offer_send);
        return res.status(200).json(OfferInfo);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const deleteOffer = async (req, res) => {
    try {
        const { _id } = req.body;
        const OfferDb = await Offer.findByIdAndDelete(_id);
        if (!OfferDb) {
            return res.status(404).json({"message": "Offer not found"});
        }
        return res.status(200).json(OfferDb);
    } catch (error) {
        return res.status(500).json(error)
    }
};

module.exports = { register, login, getOffer, getOfferById, getAllOffers, logout, putOfferName, putOfferPicture, deleteOffer }



