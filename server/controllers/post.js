const Post = require('../models/Post')

module.exports = class {
    static async createPost(req, res, next) {
        const person = await Post.create({ title: 'Ghost', body: 'stuff' });
        return res.json({
            person
        })
    }
}