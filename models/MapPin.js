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
    }
}, { timestamps: true })

module.exports = mongoose.model("Map", MapSchema);