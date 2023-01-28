const mongoose = require("mongoose");


const PostsSchema = new mongoose.Schema({
    description: {
        type: String
    },
    image: {
        type: [String]
    }
}, { timestamps: true })

module.exports = mongoose.model("Posts", PostsSchema);