const mongoose = require('mongoose');
const { Schema } = mongoose;

let issueSchema = new Schema({
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
    usersVoted: [String],
    authorID: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Issue = mongoose.model('Issue', issueSchema, 'issues');

module.exports = Issue;
