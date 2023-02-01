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

const joinGroup = async (req, res) => {
    try {
        const groups = await Group.findOneAndUpdate({_id: req.body.selection}, {
            $push: {
                members: req.body.username
            }
        })
        await groups.save().then((added) => res.json(added)).catch((err) => res.json({ error: "could notjoin group", err }));
        
    } catch {
        res.status(400).json({ error: "could not join group", err });
    }
}

module.exports = {
    newGroup,
    getGroups,
    joinGroup
}