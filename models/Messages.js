const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    text: {
        type: String,
        required: true
    }
})

const Messages = mongoose.model("Message", MessageSchema);

module.exports = Messages;