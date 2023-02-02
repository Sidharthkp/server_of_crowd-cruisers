const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const RideSchema = new mongoose.Schema({
    userName: {
        type: String
    },
    rideId: {
        type: ObjectId,
        ref: "Group"
    },
}, { timestamps: true })

const Ride = mongoose.model("Rides", RideSchema);

module.exports = Ride;