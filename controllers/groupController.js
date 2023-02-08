const Group = require("../models/Groups")

const fs = require("fs");

const url = require("url");

const path = require("path");

const multer = require("multer");
const Messages = require("../models/Messages");


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

const postDP = async (req, res) => {
    console.log(req.file);
    const post = await Group.findOneAndUpdate({ _id: req.body.selection }, {
        $set: {
            image: req.file.path,
        }
    });

    try {
        const pro = await post.save();
        res.json(pro);
    } catch (err) {
        res.status(400).json({ error: "could not save dp", err });
    }
}

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
    Group.find()
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