const Company = require('../models/company.model');
const bcrypt = require('bcryptjs');
const {generateSign} = require('../../jwt/jwt');
const { validationPassword, validationEmail } = require('../../validators/validation');

const register = async (req, res, next) => {
    try {
        if(!validationEmail(req.body.email) || await Company.findOne({email: req.body.email}) ){
            console.log({code: 403, message: "Invalid email"})
            res.status(403).send({code: 403, message: "Invalid email"});
            return next();
        }
        if(!validationPassword(req.body.password)){
            console.log({code: 403, message: "Invalid password"})
            return next();
        }
        const newCompany = new Company (req.body);
        newCompany.password = bcrypt.hashSync(newCompany.password, 10);
        const createCompany = await newCompany.save();
        createCompany.password = null;
        return res.status(201).json(createCompany);
    } catch (error) {
        return res.status(500).json(error)
    }
};

const getCompanyName = async (req, res) => {
    try {
        const CompanyInfo = await Company.findById(req.body.id);
        return res.status(200).json(CompanyInfo.name);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getCompanyById = async (req, res) => {
    try {
        const {_id} = req.body;
        const CompanyInfo = await Company.findById(_id);
        if(!CompanyInfo) return res.status(200).json('false');
        return res.status(200).json('true');
    } catch (error) {
        return res.status(500).json(error);
    }
}

const deleteCompany = async (req, res) => {
    try {
        const { _id } = req.body;
        const CompanyDb = await Company.findByIdAndDelete(_id);
        if (!CompanyDb) {
            return res.status(404).json({"message": "Company not found"});
        }
        return res.status(200).json(CompanyDb);
    } catch (error) {
        return res.status(500).json(error)
    }
};

module.exports = { register, getCompanyName, getCompanyById, deleteCompany }



