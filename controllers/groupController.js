const Group = require("../models/Groups")

const newGroup = async (req, res) => {
    console.log(req.body);
    const newgroup = new Group({
        admin: req.body.adminName,
        groupName: req.body.roomName
    })
    try {
        const newGroup = await newgroup.save();
        res.json(newGroup)
    } catch (err) {
        res.status(400).json({ error: "could not create group", err });
    }
}

const getGroups = (req, res) => {
    Group.find()
        .then((groups) => res.json(groups))
        .catch((err) => res.json({ error: "could not get groups", err }));
}

module.exports = {
    newGroup,
    getGroups
}