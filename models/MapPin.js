const mongoose = require("mongoose");


const MapSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: '5m' },
    },
}, { timestamps: true })


const Map = mongoose.model("Map", MapSchema);

module.exports = Map;