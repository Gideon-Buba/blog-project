const { Schema, ...mongoose } = require('mongoose');

const CommentSchema = new Schema({
    comment: String,
    post: Schema.ObjectId
}, {
    timestamps: true
})

module.exports = mongoose.model('Comment', CommentSchema)