const jwt = require('jsonwebtoken');
const { restart } = require('nodemon');

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

module.exports = {isAuth};