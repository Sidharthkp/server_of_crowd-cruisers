//js
const Posts = require("../models/Posts");

const fs = require("fs");

const url = require("url");

const path = require("path");

const multer = require("multer");
const Group = require("../models/Groups");
const Profile = require("../models/User");
const { validationResult } = require("express-validator");

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

const postImages = async (req, res) => {
    const post = new Posts({
        description: req.body.description,
        image: req.file.path,
        group: req.body.details,
        eventType: req.body.event,
        expirationDate: Date(req.body.registrationEndsOn)
    });

    try {
        post.save().then(() => {
            if (req.body.event === 'ride') {
                Group.findOneAndUpdate({ _id: req.body.details }, {
                    $push: {
                        rides: post._id
                    }
                }).then(() => {
                    console.log("worked");
                })
            } else {
                Group.findOneAndUpdate({ _id: req.body.details }, {
                    $push: {
                        events: post._id
                    }
                }).then(() => {
                    console.log("worked");
                })
            }
        })
        res.json(pro);
    } catch (err) {
        res.status(400).json({ error: "could not post product", err });
    }
}

const getImage = (req, res) => {
    Posts.find({ expirationDate: { $gte: new Date() } }).sort({ createdAt: -1 }).populate("regMembers")
        .then((posts) => res.json(posts))
        .catch((err) => res.json({ error: "could not get posts", err }));
}

const events = (req, res) => {
    Posts.find({ eventType: "event", expirationDate: { $gte: new Date() } }).sort({ createdAt: -1 })
        .then((posts) => res.json(posts))
        .catch((err) => res.json({ error: "could not get posts", err }));
}

const rides = (req, res) => {
    Posts.find({ eventType: "ride", expirationDate: { $gte: new Date() } }).sort({ createdAt: -1 })
        .then((posts) => res.json(posts))
        .catch((err) => res.json({ error: "could not get posts", err }));
}

const regsiterUser = async (req, res) => {
    const user = await Profile.findOne({ email: req.body.email }).populate("wishList")
    const errors = validationResult(req);
    try {
        await Posts.findOneAndUpdate({ _id: req.body.id }, { $push: { regMembers: user._id } })
            .then((added) => res.json(added)).catch((err) => res.json({ error: "could not join event", err }));
    } catch (err) {
        res.status(400).json({ error: "could not join event/ride", err, errors });
    }
}

const remove = async (req, res) => {
    const user = await Profile.findOne({ email: req.body.email })
    try {
        await Posts.findOneAndUpdate({ _id: req.body.id }, { $pull: { regMembers: user._id } })
            .then((added) => res.json(added)).catch((err) => res.json({ error: "could not join event", err }));
    } catch (err) {
        res.status(400).json({ error: "could not join event/ride", err });
    }
}

const removeAndAddInWishlist = async (req, res) => {
    const user = await Profile.findOne({ email: req.body.email })
    let wish = false;
    for (let i = 0; i < user.wishList.length; i++) {
        if (user.wishList[i].toString() == req.body.id) {
            wish = true
        }
    }
    try {
        if (wish) {
            await Posts.findOneAndUpdate({ _id: req.body.id }, { $pull: { regMembers: user._id } })
                .then((added) => res.json(added)).catch((err) => res.json({ error: "could not join event", err }));
        } else {
            await Posts.findOneAndUpdate({ _id: req.body.id }, { $pull: { regMembers: user._id } })
                .then(async (added) => {
                    await Profile.findOneAndUpdate({ email: req.body.email }, { $push: { wishList: req.body.id } })
                        .then((added) => res.json(added)).catch((err) => res.json({ error: "could not save item", err }));
                }).catch((err) => res.json({ error: "could not join event", err }));
        }
    } catch (err) {
        res.status(400).json({ error: "could not join event/ride", err });
    }
}

const wishList = async (req, res) => {
    try {
        await Profile.findOneAndUpdate({ email: req.body.email }, { $push: { wishList: req.body.id } })
            .then((added) => res.json(added)).catch((err) => res.json({ error: "could not save item", err }));
    } catch (err) {
        res.status(400).json({ error: "could not save items", err });
    }
}

const savedItems = async (req, res) => {
    try {
        Profile.find({ email: req.body.email }).populate({ path: "wishList", populate: { path: "regMembers" } }).sort({ createdAt: -1 })
            .then((data) => {
                res.json(data[0])
            })
            .catch((err) => res.json({ error: "could not get saveditems", err }));
    } catch (err) {
        res.status(400).json({ error: "could not save items", err });
    }
}

const removeSaved = async (req, res) => {
    try {
        Profile.findOneAndUpdate({ email: req.body.email }, { $pull: { wishList: req.body.id } })
            .then((data) => res.json(data))
            .catch((err) => res.json({ error: "could not delete saveditems", err }));
    } catch (err) {
        res.status(400).json({ error: "could not save items", err });
    }
}

module.exports = {
    image,
    postImages,
    single,
    getImage,
    regsiterUser,
    wishList,
    savedItems,
    removeSaved,
    events,
    rides,
    remove,
    removeAndAddInWishlist
}