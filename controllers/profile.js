const Group = require("../models/Groups");
const Post = require("../models/Posts");
const User = require("../models/User");
const { validationResult } = require("express-validator");


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

const addNew = async (req, res) => {
    const user = await User.findOne({ uid: req.body.uid })
    try {
        if (!user) {
            const newUser = new User(req.body);
            const savedUser = await newUser.save();
            res.status(200).json(savedUser);
        }else{
            res.status(200).json("user already exists");
        }
        
    } catch (err) {
        res.status(500).json(err)
    }
}

const showProfile = async (req, res) => {
    const errors = validationResult(req);
    try {
        User.findOne({ email: req.body.email })
            .then((data) => res.json(data))
            .catch((err) => res.json({ error: "could not get data", err, errors}));
    } catch (err) {
        res.status(500).json(err)
    }
}

const showCreatedCommunity = async (req, res) => {
    const errors = validationResult(req);
    try {
        Group.find({ admin: req.body.email }).populate({ path: "events" }).populate({ path: "rides" }).sort({ createdAt: -1 })
            .then((data) => res.json(data))
            .catch((err) => res.json({ error: "could not get details", err, errors }));

    } catch (err) {
        res.status(500).json(err)
    }
}

const showMembers = async (req, res) => {
    try {
        Group.findOne({ _id: req.body.data }).sort({ createdAt: -1 })
            .then((data) => res.json(data))
            .catch((err) => res.json({ error: "could not get group details", err }));
    } catch (err) {
        res.status(500).json(err)
    }
}

const membersParticipated = async (req, res) => {
    try {
        Post.findOne({ _id: req.body.data }).populate({ path: "regMembers" }).sort({ createdAt: -1 })
            .then((data) => res.json(data.regMembers))
            .catch((err) => res.json({ error: "could not get group details", err }));
    } catch (err) {
        res.status(500).json(err)
    }
}

const showJoinedEventsRides = async (req, res) => {
    try {
        Post.find().populate({ path: "regMembers" }).sort({ createdAt: -1 })
            .then((data) => res.json(data))
            .catch((err) => res.json({ error: "could not get group details", err }));
    } catch (err) {
        res.status(500).json(err)
    }
}

const editDp = async (req, res) => {
    try {
        User.findOneAndUpdate(
            {
                email: req.body.email
            },
            {
                $set: {
                    profileImage: req.file.path
                }
            }
        )
            .then((data) => res.json(data))
            .catch((err) => res.json({ error: "could not edit dp", err }));
    } catch (err) {
        res.status(500).json(err)
    }
}

const profileEdit = async (req, res) => {
    // const errors = validationResult(req);
    try {
        User.findOneAndUpdate(
            {
                email: req.body.details
            },
            {
                $set: {
                    userName: req.body.userName
                }
            }
        )
            .then((data) => res.json(data))
            .catch((err) => res.json({ error: "could not edit dp", err }));
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
    showJoinedEventsRides,
    editDp,
    image,
    single,
    profileEdit
}