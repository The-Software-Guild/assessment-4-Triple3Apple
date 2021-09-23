const jwt = require('jsonwebtoken');

const createJwt = (user) => {
    // TODO:  add encryption bcrypt
    return jwt.sign({ user }, process.env.JWT_TOKEN_SECRET, {
        expiresIn: "900min",
    });
}

module.exports = { createJwt };

