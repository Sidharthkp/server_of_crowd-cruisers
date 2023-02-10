const Group = require("../models/Groups");
const Post = require("../models/Posts");
const User = require("../models/User")

const addNew = async (req, res) => {
    const newUser = new User(req.body);
    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        res.status(500).json(err)
    }
}

const showProfile = async (req, res) => {
    try {
        User.find({ email: req.body.email })
            .then((data) => res.json(data))
            .catch((err) => res.json({ error: "could not get data", err }));
    } catch (err) {
        res.status(500).json(err)
    }
}

const showCreatedCommunity = async (req, res) => {
    try {
        Group.find({ admin: req.body.email }).populate({ path: "events" }).populate({ path: "rides" })
            .then((data) => res.json(data))
            .catch((err) => res.json({ error: "could not get details", err }));

    } catch (err) {
        res.status(500).json(err)
    }
}

const showMembers = async (req, res) => {
    try {
        Group.findOne({ _id: req.body.data })
            .then((data) => res.json(data))
            .catch((err) => res.json({ error: "could not get group details", err }));
    } catch (err) {
        res.status(500).json(err)
    }
}

const membersParticipated = async (req, res) => {
    try {
        Post.findOne({ _id: req.body.data }).populate({ path: "regMembers" })
            .then((data) => res.json(data.regMembers))
            .catch((err) => res.json({ error: "could not get group details", err }));
    } catch (err) {
        res.status(500).json(err)
    }
}

const showJoinedEventsRides = async (req, res) => {
    try {
        Post.find().populate({ path: "regMembers" })
            .then((data) => res.json(data))
            .catch((err) => res.json({ error: "could not get group details", err }));
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {
    addNew,
    showProfile,
    showCreatedCommunity,
    showMembers,
    membersParticipated,
    showJoinedEventsRides
}