const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
    // take second header element, if not found return empty string to prevent error with jwt
    const token = req.header.authorization?.split(' ')[1] || '';

    try {
        const verified = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        req.verifiedUser = verified;
        console.log('Verification success!', verified);
        next();
    } catch (error) {
        console.log('Verification failed!');
        next();
    }
}


module.exports = { authenticate };
