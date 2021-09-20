const mongoose = require('mongoose');
const { Schema } = mongoose;

let commentSchema = new Schema({
    issueID: {
        type: String,
        required: true,
    },
    commentText: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema, 'comments');

module.exports = Comment;