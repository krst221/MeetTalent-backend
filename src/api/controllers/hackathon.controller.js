const Hackathon = require('../models/hackathon.model');

const getAllHack = async (req, res) => {
    try {
        const allHack = await Hackathon.find();
        return res.status(200).json(allHack);
    } catch (error) {
        return res.status(500).json(error)
    }
};

const getHack = async (req, res) => {
    try {
        const HackInfo = await Hackathon.findById(req.body._id);
        return res.status(200).json(HackInfo);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getHackById = async (req, res) => {
    try {
        const {Hack_send} = req.body;
        const HackInfo = await Hackathon.findById(Hack_send);
        return res.status(200).json(HackInfo);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const deleteHack = async (req, res) => {
    try {
        const { _id } = req.body;
        const HackDb = await Hackathon.findByIdAndDelete(_id);
        if (!HackDb) {
            return res.status(404).json({"message": "Hack not found"});
        }
        return res.status(200).json(HackDb);
    } catch (error) {
        return res.status(500).json(error)
    }
};

module.exports = { getHack, getHackById, getAllHack, deleteHack }



