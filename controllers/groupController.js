const Group = require("../models/Groups")

const Messages = require("../models/Messages");

const fs = require("fs");

const url = require("url");

const path = require("path");

const multer = require("multer");


//Filtering the file
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb("JPEG and PNG only supported", false);
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/Profile");
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

const single = upload.single("postImage");

//For Creating a Pin
const image = async (req, res) => {

    // Parsing the URL
    var request = url.parse(req.url, true);

    // console.log(request.query);

    // Extracting the path of file
    var action = request.pathname;
    // console.log(action);

    var filePath = path.join(__dirname,
        action).split("%20").join(" ");

    // console.log(filePath);
    fs.exists(filePath, function (exists) {
        if (!exists) {
            res.writeHead(404, {
                "Content-Type": "text/plain"
            });
            res.end("404 Not Found");
            return;
        }

        // Extracting file extension
        var ext = path.extname(action);

        // Setting default Content-Type
        var contentType = "text/plain";

        // Checking if the extension of
        // image is '.png'
        if (ext === ".png") {
            contentType = "image/png";
        }

        // Setting the headers
        res.writeHead(200, {
            "Content-Type": contentType
        });

        // Reading the file
        fs.readFile("" + request.query.q,
            function (err, content) {
                // Serving the image
                res.end(content);
            });
    });
}

const newGroup = async (req, res) => {
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
    Group.find().sort({ messageUpdate: -1 })
        .then((groups) => res.json(groups))
        .catch((err) => res.json({ error: "could not get groups", err }));
}

const getGroupsList = (req, res) => {
    let arrayOfGroups = []
    Group.find().sort({ createdAt: -1 })
        .then((groups) => {
            for (let i = 0; i < groups.length; i++) {
                let boolean = false;
                groups[i].members.map((x) => {
                    if (x === req.body.username) {
                        boolean = true
                    }
                })
                if (boolean == false) {
                    arrayOfGroups.push(groups[i])
                }
            }
            res.json(arrayOfGroups)
        }
        )
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

const editGrpDp = async (req, res) => {
    try {
        Group.findOneAndUpdate(
            {
                _id: req.body.id
            },
            {
                $set: {
                    image: req.file.path
                }
            }
        )
            .then((data) => res.json(data))
            .catch((err) => res.json({ error: "could not edit dp", err }));
    } catch (err) {
        res.status(500).json(err)
    }
}

const editGrpName = async (req, res) => {
    try {
        Group.findOneAndUpdate(
            {
                _id: req.body.id
            },
            {
                $set: {
                    groupName: req.body.grpName
                }
            }
        )
            .then((data) => res.json(data))
            .catch((err) => res.json({ error: "could not edit grp name", err }));
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {
    newGroup,
    getGroups,
    joinGroup,
    openGroup,
    messages,
    editGrpDp,
    image,
    single,
    getGroupsList,
    editGrpName
}