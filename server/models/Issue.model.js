const mongoose = require('mongoose');
const { Schema } = mongoose;

let issueSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    upvotes: {
        type: String,
        required: true,
    },
    downvotes: {
        type: String,
        required: true,
    },
    usersVoted: [String],
    userID: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Issue = mongoose.model('Issue', issueSchema, 'issues');

module.exports = Issue;
