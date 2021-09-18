const mongoose = require('mongoose');
const { Schema } = mongoose;

let issueSchema = new Schema({
    title: String,
    description: String,
    upvotes: Number,
    downvotes: Number,
    usersVoted: [String],
    authorID: String
});

const Issue = mongoose.model('Issue', issueSchema, 'issues');

module.exports = Issue;
