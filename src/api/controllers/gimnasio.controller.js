const Gym = require('../models/gimnasio.model');
const bcrypt = require('bcrypt');
const {generateSign} = require('../../jwt/jwt');
const { validationPassword, validationEmail } = require('../../validators/validation');

const getAllGyms = async (req, res) => {
    try {
        const allGyms = await Gym.find().populate("pokemons");
        return res.status(200).json(allGyms);
    } catch (error) {
        return res.status(500).json(error)
    }
};

// const getIdGym = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const allGym = await Gym.find(id);
//         return res.status(200).json(allGym);
//     } catch (error) {
//         return res.status(500).json(error)
//     }
// };

const register = async (req, res, next) => {
    try {
        const { name, email, password, region, type, pokemons } = req.body;
        if(!validationEmail(email)){
            console.log({code: 403, message: "Invalid email"})
            res.status(403).send({code: 403, message: "Invalid email"});
            return next();
        }
        if(!validationPassword(password)){
            console.log({code: 403, message: "Invalid password"})
            return next();
        }
        const newGym = new Gym ({ name, email, password, region, type, pokemons });
        newGym.password = bcrypt.hashSync(newGym.password, 10);
        const createGym = await newGym.save();
        return res.status(201).json(createGym);
    } catch (error) {
        return res.status(500).json(error)
    }
};

const login = async (req, res, next) => {
    try {
        const gymInfo = await Gym.findOne({email: req.body.email});
        if(!gymInfo) return res.status(400).json({message: 'No se encuentra el mail'});
        if(bcrypt.compareSync(req.body.password, gymInfo.password)){
            gymInfo.password = null;
            console.log(gymInfo);
            const token = generateSign(gymInfo._id, gymInfo.email);
            return res.status(200).json(token);
        }
        else return res.status(400).json({message: 'Contraseña incorrecta'});
        next();
    } catch (error) {
        return res.status(500).json(error);
    }
}

const logout = async (req, res, next) => {
    try {
        return res.status(200).json({token: null});
    } catch (error) {
        return res.status(500).json(error);
    }
}

const putGym = async (req, res) => {
    try {
        const { id } = req.params;
        const putGym = new Gym (req.body);
        putGym._id = id;

        const GymDb = await Gym.findByIdAndUpdate(id, putGym, {new: true});
        if (!GymDb) {
            return res.status(404).json({"message": "Gym not found"});
        }
        return res.status(200).json(GymDb);
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

module.exports = { getAllGyms, register, login, logout, putGym, deleteGym }



