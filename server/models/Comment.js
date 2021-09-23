const mongoose = require('mongoose');
// const { Schema } = mongoose;

let commentSchema = new mongoose.Schema({
    issueId: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    }
}, { timestamps: true });

// const Comment = mongoose.model('comment', commentSchema, 'comments');

// module.exports = Comment;
module.exports = mongoose.model('comment', commentSchema, 'comments');