const mongoose = require('mongoose');


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


module.exports = mongoose.model('comment', commentSchema, 'comments');