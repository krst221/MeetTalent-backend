const User = require('../models/user.model');
const Offer = require('../models/offer.model');
const bcrypt = require('bcrypt');
const {generateSign} = require('../../jwt/jwt');
const { validationPassword, validationEmail } = require('../../validators/validation');

const register = async (req, res, next) => {
    try {
        if(!validationEmail(req.body.email) || await User.findOne({email: req.body.email}) ){
            console.log({code: 403, message: "Invalid email"})
            res.status(403).send({code: 403, message: "Invalid email"});
            return next();
        }
        if(!validationPassword(req.body.password)){
            console.log({code: 403, message: "Invalid password"})
            return next();
        }
        const newUser = new User (req.body);
        newUser.password = bcrypt.hashSync(newUser.password, 10);
        const createUser = await newUser.save();
        createUser.password = null;
        return res.status(201).json(createUser);
    } catch (error) {
        return res.status(500).json(error)
    }
};

const login = async (req, res, next) => {
    try {
        const UserInfo = await User.findOne({email: req.body.email}).populate('inbox').populate('outbox');
        if(!UserInfo) return res.status(400).json({message: 'No se encuentra el mail'});
        if(bcrypt.compareSync(req.body.password, UserInfo.password)){
            const token = generateSign(UserInfo._id, UserInfo.email);
            UserInfo.password = null;
            return res.status(200).json({token: token, user: UserInfo});
        }
        else return res.status(400).json({message: 'Contraseña incorrecta'});
        next();
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        return res.status(200).json(allUsers);
    } catch (error) {
        return res.status(500).json(error)
    }
};

const getUser = async (req, res) => {
    try {
        const UserInfo = await User.findById(req.body._id).populate('inbox').populate('outbox');
        return res.status(200).json(UserInfo);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getUserById = async (req, res) => {
    try {
        const {user_send} = req.body;
        const UserInfo = await User.findById(user_send).populate('inbox').populate('outbox');
        return res.status(200).json(UserInfo);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const joinOffer = async (req, res) => {
    try {
        const {uId, oId} = req.body;
        let user = await User.findById(uId);
        let offer = await Offer.findById(oId);
        const findOffer = await User.find({$and: [{_id: user._id},{offers: offer._id}]});
        if(findOffer.length > 0) return res.status(500).json(error);
        else {
            user = await User.updateOne({_id: user._id}, {$push: {offers: oId}});
            offer = await Offer.updateOne({_id: offer._id}, {$push: {users: uId}});
            return res.status(200).json({user: user, offer: offer});
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

const logout = async (req, res) => {
    try {
        return res.status(200).json({token: null});
    } catch (error) {
        return res.status(500).json(error);
    }
}

const putUser = async (req, res) => {
    try {
        const UserDb = await User.findByIdAndUpdate(_id, req.body);
        if (!UserDb) {
            return res.status(404).json({"message": "User not found"});
        }
            return res.status(200).json(UserDb);
    } catch (error) {
        return res.status(500).json(error);
    }
};


const deleteUser = async (req, res) => {
    try {
        const { _id } = req.body;
        const UserDb = await User.findByIdAndDelete(_id);
        if (!UserDb) {
            return res.status(404).json({"message": "User not found"});
        }
        return res.status(200).json(UserDb);
    } catch (error) {
        return res.status(500).json(error)
    }
};

module.exports = { register, login, getUser, getUserById, getAllUsers, joinOffer, logout, putUser, deleteUser }



