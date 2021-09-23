const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLID } = require('graphql');
// const { User } = require('../models/User');
// const { Issue } = require('../models/Issue');
// const { Comment } = require('../models/Comment');
const { User, Issue, Comment } = require("../models");

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'User type',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString }
    }),
});

const IssueType = new GraphQLObjectType({
    name: 'Issue',
    description: 'Issue type',
    fields: () => ({    // wrapped in ({}) in order to make it a function instead of object so it can be able to reference CommentType which is referenced below
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        upvotes: { type: GraphQLInt },
        downvotes: { type: GraphQLInt },
        usersVoted: { type: GraphQLList(GraphQLString) },  // Might be a problem??!!
        author: {
            type: UserType,
            resolve(parent, args) {
                console.log('-----------------------------------');
                console.log(User);
                return User.findById(parent.authorId)
            },
        },
        // author: {
        //     type: UserType,
        //     resolve(parent, args) {
        //         console.log('parent.authorID1: ' + parent.authorID);
        //         console.log(parent);
        //         console.log('users:');
        //         console.log(User.find());
        //         return User.findById(parent.authorId);
        //     },
        // },
        comments: {
            type: GraphQLList(CommentType),
            resolve(parent, args) {
                return Comment.find({ issueId: parent.id });
            },
        },
    }),
});

const CommentType = new GraphQLObjectType({
    name: 'Comment',
    description: 'Comment type',
    fields: () => ({
        id: { type: GraphQLID },
        comment: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.userId);
            }
        },
        issue: {
            type: IssueType,
            resolve(parent, args) {
                return Issue.findById(parent.issueId);
            },
        },
    }),
});

module.exports = { UserType, IssueType, CommentType }






