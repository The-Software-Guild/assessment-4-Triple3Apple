const mongoose = require('mongoose');


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
            type: [String],
            required: true,
        },
        authorId: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('issue', issueSchema, 'issues');
