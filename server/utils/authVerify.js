const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {

    console.log('\nAUTHENTICATING GQL REQUEST\n');

    // take second header element, if not found return empty string to prevent error with jwt
    console.log(`req.header:`)
    console.log(req.headers);
    const token = req.header('Authorization')?.split(' ')[1] || '';
    console.log(`\n token received: ${token}`);
    console.log(`\n jwt_token: ${process.env.JWT_TOKEN_SECRET}\n`);

    try {
        const verified = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        req.verifiedUser = verified.user;
        console.log("\nVerification success!\n", verified);
        next();
    } catch (error) {

        console.log("\nVerification FAILED!\n", error.name)
        return res.status(401).send(error);

    }
}


module.exports = { authenticate };
