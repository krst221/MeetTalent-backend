const Offer = require('../models/offer.model');
const Company = require('../models/company.model');
const User = require('../models/user.model');

const addOffer = async (req, res) => {
    try {
        const newOffer = new Offer (req.body);
        let company = await Company.findById(newOffer.company);
        company = await Company.updateOne({_id: company.id}, {$push: {offers: newOffer._id}});
        const createdOffer = await newOffer.save();
        return res.status(200).json(createdOffer);
    } catch (error) {
        return res.status(500).json(error)
    }
};

const closeOffer = async (req, res) => {
    try {
        const {cId, oId} = req.body;
        const offer = await Offer.findByIdAndUpdate(oId, {processnum: 100} );
        if(JSON.parse(JSON.stringify(offer.company)) == cId){
            console.log(offer._id);
            const newusers = await User.updateMany({offers: offer._id}, {$pull: {offers: offer._id}})
            return res.status(200).json(newusers);
        }
        else return res.status(500).json(error);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getAllOffers = async (req, res) => {
    try {
        const allOffers = await Offer.find();
        console.log(allOffers);
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

module.exports = { addOffer, closeOffer, getOffer, getOfferById, getAllOffers, deleteOffer }



