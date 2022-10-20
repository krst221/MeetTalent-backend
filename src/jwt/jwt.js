const jwt = require('jsonwebtoken');

const generateSign = (id, email) => jwt.sign({id, email}, process.env.JWT_KEY, {expiresIn: '1h'});

/* const verifyJwt = (token) => jwt.verify(token, process.env.JWT_KEY); */

module.exports = {generateSign};