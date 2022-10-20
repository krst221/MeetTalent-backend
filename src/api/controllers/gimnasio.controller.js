const Pokemon = require('../models/gimnasio.model');

const getAllGyms = async (req, res) => {
    try {
        const getAllGyms = await Gym.find();
        return res.status(200).json(allGyms);
    } catch (error) {
        return res.status(500).json(error)
    }
};

const getIdGym = async (req, res) => {
    try {
        const { id } = req.params;
        const allGym = await Pokemon.find(id);
        return res.status(200).json(allGym);
    } catch (error) {
        return res.status(500).json(error)
    }
};

const getNameGym = async (req, res) => {
    try {
        const { name } = req.params;
        const allGyms = await Gym.find(name);
        return res.status(200).json(allGyms);
    } catch (error) {
        return res.status(500).json(error)
    }
};

const postGym = async (req, res) => {
    try {
        const { name, email, password, region, type, pokemons } = req.body;
        const newGym = new Gym ({ name, email, password, region, type, pokemons });
        const createGym = await newGym.save();
        return res.status(201).json(createGym);
    } catch (error) {
        return res.status(500).json(error)
    }
};

const putGym = async (req, res) => {
    try {
        const { id } = req.params;
        const putGym = new Gym (req.body);
        putGym._id = id;

        const GymDb = await Gym.findByIdAndUpdate(id, putGym, {new: true});
        if (!GymDb) {
            return res.status(404).json({"message": "Gym not found"});
        }
        return res.status(200).json(putGym);
    } catch (error) {
        return res.status(500).json(error)
    }
};

const deleteGym = async (req, res) => {
    try {
        const { id } = req.params;
        const GymDb = await Gym.findByIdAndDelete(id);
        if (!GymDb) {
            return res.status(404).json({"message": "Gym not found"});
        }
        return res.status(200).json(GymDb);
    } catch (error) {
        return res.status(500).json(error)
    }
};

module.exports = { getAllGyms, getIdGym, getNameGym, postGym, putGym, deleteGym }



