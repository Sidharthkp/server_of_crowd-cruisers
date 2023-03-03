    const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const ProfileSchema = new mongoose.Schema({
    userName: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true
    },
    wishList: {
        type: [ObjectId],
        ref: "Posts"
    },
    profileImage: {
        type: String
    },
    vehicledetails: {
        type: ObjectId
    }
}, { timestamps: true })

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;