const Group = require("../models/Groups")

const multer = require("multer");
const Messages = require("../models/Messages");

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb("JPEG and PNG only supported", false);
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/Images");
    },
    filename: (req, file, cb) => {
        cb(
            null,
            new Date().toISOString().replace(/:/g, "-") + file.originalname
        );
    },
});

const upload = multer({
    storage: storage,
    limts: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
});

const newGroup = async (req, res) => {
    console.log(req.body);
    const newgroup = new Group({
        admin: req.body.adminName,
        groupName: req.body.roomName,
        members: [req.body.adminName]
    })
    try {
        const newGroup = await newgroup.save();
        res.json(newGroup)
    } catch (err) {
        res.status(400).json({ error: "could not create group", err });
    }
}

const getGroups = (req, res) => {
    Group.find().sort({createdAt: -1})
        .then((groups) => res.json(groups))
        .catch((err) => res.json({ error: "could not get groups", err }));
}

const joinGroup = async (req, res) => {
    try {
        const groups = await Group.findOneAndUpdate({ _id: req.body.selection }, {
            $push: {
                members: req.body.username
            }
        })
        await groups.save().then((added) => res.json(added)).catch((err) => res.json({ error: "could notjoin group", err }));

    } catch (err) {
        res.status(400).json({ error: "could not join group", err });
    }
}

const openGroup = async (req, res) => {
    try {
        await Group.findOne({ _id: req.body.details })
            .then((group) => res.json(group))
            .catch((err) => res.json({ error: "could not get group", err }));

    } catch (err) {
        res.status(400).json({ error: "could not join group", err });
    }
}

const messages = async (req, res) => {
    try {
        await Messages.find({ group: req.body.details })
            .then((groupMsg) => res.json(groupMsg))
            .catch((err) => res.json({ error: "could not get group messages", err }));
    } catch (err) {
        res.status(400).json({ error: "could not retrieve messages", err });
    }
}

module.exports = {
    newGroup,
    getGroups,
    joinGroup,
    openGroup,
    messages
}