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

module.exports = {
    addNew,
    showProfile
}