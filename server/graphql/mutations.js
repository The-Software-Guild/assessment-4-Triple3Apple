const { GraphQLString, GraphQLInt, GraphQLList } = require('graphql');
const { IssueType, CommentType } = require('./types');
const { User, Issue, Comment } = require("../models");

const addIssue = {
    type: IssueType,
    description: 'Create a new issue',
    args: {
        title: { type: GraphQLString },
        body: { type: GraphQLString },
    },
    // verifiedUser is from server.js: app.use(authenticate);
    resolve(parent, args, { verifiedUser }) {

        console.log('\nAttempting to add issue...\n');

        console.log('Verified User: ' + verifiedUser);
        if (!verifiedUser) {
            throw new Error("Unauthorized")
        }

        const issue = new Issue({
            authorId: verifiedUser._id,
            title: args.title,
            body: args.body,
            upvotes: 0,
            downvotes: 0,
            usersVoted: [],
        })

        return issue.save();
    },
}

const addComment = {
    type: CommentType,
    description: 'Create a new comment on a post',
    args: {
        comment: { type: GraphQLString },
        issueId: { type: GraphQLString }
    },
    resolve(parent, args, { verifiedUser }) {
        const comment = new Comment({
            issueId: args.issueId,
            comment: args.comment,
            userId: verifiedUser._id
        });
        console.log('adding new comment from mutations.js (server)');
        console.log(comment);

        return comment.save();
    }
}

const updateIssue = {
    type: IssueType,
    description: "Update an issue's properties",
    args: {
        issueId: { type: GraphQLString },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        upvotes: { type: GraphQLInt },
        downvotes: { type: GraphQLInt },
        usersVoted: { type: GraphQLList(GraphQLString) }
    },
    async resolve(parent, args) {

        console.log('upvotes recieved in resolve ' + args.upvotes);
        console.log('downvotes recieved in resolve ' + args.downvotes);

        const issueUpdated = await Issue.findOneAndUpdate(
            {
                // find issue with these matching params
                _id: args.issueId
            },
            {
                title: args.title,
                body: args.body,
                upvotes: args.upvotes,
                downvotes: args.downvotes,
                usersVoted: args.usersVoted
            }, {
            runValidators: true,
            new: true // return doc after update was applied
        });

        if (!issueUpdated) {
            throw new Error("Can't find issue to update");
        }

        return issueUpdated;
    }
}

const deleteIssue = {
    type: IssueType,
    description: "Delete an issue from the database",
    args: {
        issueId: { type: GraphQLString }
    },
    async resolve(parent, args, { verifiedUser }) {
        const deletedIssue = await Issue.findOneAndDelete(
            {
                _id: args.issueId, authorId: verifiedUser._id
            },
        );

        if (!deletedIssue) {
            console.log('ERROR: Cant find issue');
            throw new Error("Can't find issue to delete");
        }

        console.log('Issue has been deleted ', deleteIssue.title);
        return deleteIssue;
    }
}
const deleteComment = {
    type: GraphQLString,
    description: "Delete a comment from the database",
    args: {
        commentId: { type: GraphQLString }
    },
    async resolve(parent, args, { verifiedUser }) {
        const deletedComment = await Comment.findOneAndDelete(
            {
                _id: args.commentId, authorId: verifiedUser._id
            },
        );

        if (!deletedComment) {
            console.log('ERROR: Cant find comment to delete');
            throw new Error("Can't find comment to delete");
        }

        console.log('Comment has been deleted');
        return 'Comment has been deleted';
    }
}

module.exports = { addIssue, addComment, updateIssue, deleteIssue, deleteComment };
