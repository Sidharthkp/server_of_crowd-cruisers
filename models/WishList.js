const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const WhisListSchema = new mongoose.Schema({
    userName: {
        type: String
    },
    eventId: {
        type: ObjectId,
        ref: "Posts"
    }
}, { timestamps: true })

const WhishList = mongoose.model("WishList", WhisListSchema);

module.exports = WhishList;