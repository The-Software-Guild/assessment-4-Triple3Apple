const mongoose = require('mongoose');
const { Schema } = mongoose;

let commentSchema = new Schema({
    issueID: String,
    commentText: String,
    authorID: String
});

const Comment = mongoose.model('Comment', commentSchema, 'comments');

module.exports = Comment;