const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const EventSchema = new mongoose.Schema({
    userName: {
        type: String
    },
    eventId: {
        type: ObjectId,
        ref: "Posts"
    }
}, { timestamps: true })

const Event = mongoose.model("Events", EventSchema);

module.exports = Event;