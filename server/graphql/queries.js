const { GraphQLList, GraphQLID, GraphQLString } = require('graphql');
const { UserType, IssueType, CommentType } = require('./types');
const { User, Issue, Comment } = require("../models");

// Query that returns all users
const users = {
    type: new GraphQLList(UserType),
    description: 'Query that returns all users',
    resolve(parent, args) {
        return User.find()
    },
}

// Query that returns one user
const user = {
    type: UserType,
    description: "Retrieves current user",
    resolve(parent, args, { verifiedUser }) {
        return User.findById(verifiedUser._id);
    },
}

const issues = {
    type: new GraphQLList(IssueType),
    description: 'Query that returns all issues',
    resolve(parent, args) {
        return Issue.find();
    }
}

const issue = {
    type: IssueType,
    description: "Retrieves one issue via issue id",
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
        return Issue.findById(args.id);
    },
}

const issuesByUser = {
    type: new GraphQLList(IssueType),   // NOTE: Don't forget the 'new' for graphqllists 
    description: 'Query that returns all issue made by current user',
    resolve(parent, args, { verifiedUser }) {
        console.log('Finding Issues...');
        // NOTE: find returns an ARRAY
        return Issue.find({ authorId: verifiedUser._id });
    }
}

const comments = {
    type: new GraphQLList(CommentType),
    description: 'Query that returns all comments',
    resolve(parent, args) {
        return Comment.find();
    }
}

const comment = {
    type: CommentType,
    description: "Retrieves one comment via comment id",
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
        return comment.findById(args.id);
    },
}

const commentsByUser = {
    type: new GraphQLList(CommentType),   // NOTE: Don't forget the 'new' for graphqllists
    description: 'Query that returns all comments made by a user',
    args: { userId: { type: GraphQLID } },
    resolve(parent, args) {
        console.log('Finding comments...');
        return Comment.find({ userId: args.userId });
    }
}

module.exports = { users, user, issues, issue, issuesByUser, comments, comment, commentsByUser }
