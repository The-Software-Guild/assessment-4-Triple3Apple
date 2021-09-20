const { GraphQLString } = require('graphql');
const { } = require('./types');
const User = require('../models/User.model');
const Issue = require('../models/Issue.model');
const Comment = require('../models/Comment.model');
const { createJwt } = require('../utils/auth')

const register = {
    type: GraphQLString,
    args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString }
    },
    // args references the args we get from the request (described above)
    async resolve(parent, args) {
        const { username, password, email } = args;
        const user = new User({ username, password, email });

        // Add a user document to mongodb
        await user.save();
        const token = createJwt(user);
        return token;
    }
}


const login = {
    type: GraphQLString,
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    async resolve(parent, args) {
        // Used find one to return one user not an array
        const user = await User.findOne({ email: args.email }).select('+password');

        // TODO: Decrypt password here to compare

        // Check if password is valid and that user was found with that email
        if (!user || args.password !== user.password) {
            throw new Error('Invalid credentials');
        }

        const token = createJwt(user);
        return token;


    }
}

module.exports = { register, login };
