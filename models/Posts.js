const mongoose = require("mongoose");


const PostsSchema = new mongoose.Schema({
    description: {
        type: String
    },
    image: {
        type: [String]
    }
}, { timestamps: true })

const Post = mongoose.model("Posts", PostsSchema);

module.exports = Post;