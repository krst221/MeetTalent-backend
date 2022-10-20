const jwt = require('jsonwebtoken');
const { restart } = require('nodemon');

const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    const token = authorization.split(" ")[1];

    if(!token) {
        return res.status(401).json({message: 'No has puesto token!'});
    }

    if(!authorization) {
        return res.status(401).json({message: 'Donde vas flipao'});
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