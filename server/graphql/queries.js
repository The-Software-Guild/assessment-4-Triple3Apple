const { GraphQLList } = require('graphql');
const { UserType } = require('./types');
const User = require('../models/User.model');
const Issue = require('../models/Issue.model');
const Comment = require('../models/Comment.model');

const users = {
    type: new GraphQLList(UserType),
    resolve(parent, args) {
        // finds all the users
        return User.find()
    }
}

module.exports = { users }
