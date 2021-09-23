const mongoose = require('mongoose');
// const { Schema } = mongoose;

let issueSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        upvotes: {
            type: Number,
            required: true,
        },
        downvotes: {
            type: Number,
            required: true,
        },
        usersVoted: {
            type: [String], // maybe error, before: just -->  [String]
            required: true,
        },
        authorId: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

// const Issue = mongoose.model('Issue', issueSchema, 'issues');

// module.exports = Issue;

module.exports = mongoose.model('issue', issueSchema, 'issues');
