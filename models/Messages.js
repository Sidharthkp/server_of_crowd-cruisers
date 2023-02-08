const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const MessageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    text: {
        type: String,
        required: true
    },

    group: {
        type: ObjectId,
        ref: "Group"
    }
}, { timestamps: true })

const Messages = mongoose.model("Message", MessageSchema);

module.exports = Messages;