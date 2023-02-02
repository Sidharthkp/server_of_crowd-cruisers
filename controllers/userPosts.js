//js
const Posts = require("../models/Posts");

const fs = require("fs");

const url = require("url");

const path = require("path");

const multer = require("multer");
const Ride = require("../models/Rides");
const Event = require("../models/Events");
const WhishList = require("../models/WishList");


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
        eventType: req.body.event
    });

    try {
        const pro = await post.save();
        res.json(pro);
    } catch (err) {
        res.status(400).json({ error: "could not post product", err });
    }
}

const getImage = (req, res) => {
    Posts.find()
        .then((posts) => res.json(posts))
        .catch((err) => res.json({ error: "could not get posts", err }));
}

const regsiterUser = async (req, res) => {
    const post = await Posts.findOne({ _id: req.body.id })
    const wish = await WhishList.findOne({ userName: req.body.username })
    const rideCheck = await Ride.find({userName: req.body.username, rideId: req.body.id})
    const eventCheck = await Event.find({userName: req.body.username, eventId: req.body.id})
    console.log(rideCheck)
    console.log(eventCheck)
    try {
        if (!wish) {
            if (post.eventType == "ride" && rideCheck.length == 0) {
                const rideJoin = new Ride({
                    userName: req.body.username,
                    rideId: req.body.id
                })
                await rideJoin.save().then((added) => res.json(added)).catch((err) => res.json({ error: "could not join ride", err }));
            } else if (post.eventType == "event" && eventCheck.length == 0) {
                const eventJoin = new Event({
                    userName: req.body.username,
                    eventId: req.body.id
                })
                await eventJoin.save().then((added) => res.json(added)).catch((err) => res.json({ error: "could not join ride", err }));
            } else {
                console.log("REched bad");
                res.json({ error: "could not join ride", err });
            }
        } else {
            if (post.eventType == "ride") {
                const rideJoin = new Ride({
                    userName: req.body.username,
                    rideId: req.body.id
                })
                rideJoin.save()
                    .then(async (added) => {
                        await WhishList.findOneAndDelete({ eventId: req.body.id })
                        res.json(added)
                    })
                    .catch((err) => res.json({ error: "could not join ride", err }));
            } else {
                const eventJoin = new Event({
                    userName: req.body.username,
                    eventId: req.body.id
                })
                eventJoin.save()
                    .then(async (added) => {
                        await WhishList.findOneAndDelete({ eventId: req.body.id })
                        res.json(added)
                    })
                    .catch((err) => res.json({ error: "could not join ride", err }));
            }
        }
    } catch (err) {
        res.status(400).json({ error: "could not join event/ride", err });
    }
}

const wishList = async (req, res) => {
    try {
        const wishList = new WhishList({
            userName: req.body.userName,
            eventId: req.body.id
        })
        await wishList.save().then((added) => res.json(added)).catch((err) => res.json({ error: "could not save item", err }));
    } catch (err) {
        res.status(400).json({ error: "could not save items", err });
    }
}

const saveItems = async (req, res) => {
    try {
        WhishList.find({ userName: req.body.username }).populate("eventId")
            .then((data) => res.json(data))
            .catch((err) => res.json({ error: "could not get saveditems", err }));
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
    saveItems
}