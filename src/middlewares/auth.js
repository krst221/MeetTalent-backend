const jwt = require('jsonwebtoken');
const Company = require('../api/models/company.model');

const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    const token = authorization.split(" ")[1];

    if(!token) {
        return res.status(401).json({message: 'Token not found!'});
    }

    if(!authorization) {
        return res.status(401).json({message: 'Access not allowed'});
    }

    try {
        var tokenVerified = jwt.verify(token, process.env.JWT_KEY);
        req._user = tokenVerified;
    } catch (error) {   
        return res.status(500).json(error);
    }

    next();
}

const isCompany = async(req, res, next) => {
    const authorization = req.headers.authorization;
    const token = authorization.split(" ")[1];

    if(!token) {
        return res.status(401).json({message: 'Token not found!'});
    }

    if(!authorization) {
        return res.status(401).json({message: 'Access not allowed'});
    }

    try {
        var tokenVerified = jwt.verify(token, process.env.JWT_KEY);
        const companyLogged = await Company.findById(tokenVerified.id);
        companyLogged.password = null;
        req._user = companyLogged;
    } catch (error) {   
        return res.status(500).json(error);
    }

    next();
}

module.exports = {isAuth, isCompany};