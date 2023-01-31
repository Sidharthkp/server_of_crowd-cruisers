const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
    admin: {
        type: String,
        required: true
    },

    groupName: {
        type: String,
        required: true
    },

    members: {
        type: [String],
    }
})

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;