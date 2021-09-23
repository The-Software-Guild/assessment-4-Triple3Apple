const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {

    console.log('\nAUTHENTICATING GQL REQUEST\n');

    // take second header element, if not found return empty string to prevent error with jwt
    // const token = req.headers.authorization?.split(' ')[1] || '';
    const token = req.header('Authorization')?.split(' ')[1] || '';

    try {
        const verified = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        req.verifiedUser = verified.user;
        console.log("\nVerification success!\n", verified);
        next();
    } catch (error) {
        // console.log('verified:');
        // console.log(verified);
        // console.log('req.verifiedUser');
        // console.log(req.verifiedUser);
        console.log("\nVerification FAILED!\n", error.name)
        return res.status(401).send(error);
        // next(error);
        //next(err);          // TODO: PROBLEM! Continues to give result after next, maybe use custom error handler????
    }
}


module.exports = { authenticate };
