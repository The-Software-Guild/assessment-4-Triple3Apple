const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLID } = require('graphql');
const { User } = require('../models/User.model');
const { Issue } = require('../models/Issue.model');
const { Comment } = require('../models/Comment.model');


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
        authorID: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.authorID);
            }
        },
        comments: {
            type: GraphQLList(CommentType),
            resolve(parent, args) {
                return Comment.find({ issueID: parent.id });
            }
        },

    })
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
                return User.findById(parent.userID);
            }
        },
        issue: {
            type: IssueType,
            resolve(parent, args) {
                return Issue.findByID(parent.issueID);
            }
        }
    })
});

module.exports = { UserType, IssueType, CommentType }






