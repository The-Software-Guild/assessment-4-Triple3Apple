const express = require('express');
const bcrypt = require('bcryptjs');
const { createJwt } = require('../utils/auth');
const { authenticate } = require('../utils/authVerify');
const joi = require('joi');

const { User, Issue, Comment } = require("../models");

// Resources Used
// [https://joi.dev/api/?v=17.4.2]
// [https://openbase.com/js/bcrypt/documentation]
// [https://medium.com/swlh/nodejs-with-jwt-authentication-feb961763541]

const registerUserSchema = joi.object({
    username: joi.string().min(3).required(),
    password: joi.string().min(5).required(),
    email: joi.string().email().min(7).required(),
});

const router = express.Router();

router.post('/register', async (req, res, next) => {
    console.log('registering user...');
    console.log(req.body);

    const { username, password, email } = req.body;

    if (await isRegisterInfoValid(username, email)) {

        console.log('\nUSERNAME & EMAIL is valid\n');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('hashed password: ' + hashedPassword);

        const user = new User({ username: username, password: hashedPassword, email: email });

        try {
            // validate user input
            const { error } = await registerUserSchema.validateAsync(req.body);

            if (error) {
                error.statusCode = 400;
                return next(error);
            } else {
                // register user & send jwt token
                await user.save();

                // get user after saving into db in order to get its _id
                const savedUser = await User.findOne({ email: req.body.email }).select("+password");

                const token = createJwt(user);
                return res.status(200).send({ status: "User Registered", token: token, user: savedUser });
            }

        } catch (error) {
            console.log('encountered error');
            console.log(error);
            return next(error);
        }
    } else {
        console.log('------Username or email exists in db-------------');
        let usernameExists = await User.findOne({ username: username });
        let emailExists = await User.findOne({ email: email });

        if (usernameExists) {
            return res.status(400).send('Username already exists');
        } else if (emailExists) {
            return res.status(400).send('Account already associated with the email provided');
        } else {
            return res.status(500).send('error with registering user...');
        }
    }
});

router.post('/login', async (req, res, next) => {
    console.log('\nAttempting to login...\n');

    const user = await User.findOne({ email: req.body.email }).select("+password");

    if (!user || (await bcrypt.compare(req.body.password, user.password)) == false) {
        // throw new Error("Invalid credentials");
        console.log('\Login failed, invalid credentials\n');
        return res.status(401).send('Invalid credentials');
    }

    const token = createJwt(user);
    console.log('\nLogin Successful!\n');
    // Sending back the user without the password field for security
    const userNoPass = await User.findOne({ email: req.body.email });
    return res.status(200).send({ status: "Login Successful", token: token, user: userNoPass });
});

const isRegisterInfoValid = async (username, email) => {
    let isValid = false;

    const usernameExists = await User.findOne({ username: username });
    const emailExists = await User.findOne({ email: email });

    if (!usernameExists && !emailExists) {
        isValid = true;
        console.log('username and email is valid/not in db');
    }

    return isValid;
}


module.exports = router;