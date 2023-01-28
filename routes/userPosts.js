const router = require("express").Router();

const multer = require("multer");

const Posts = require("../models/Posts");

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb("JPEG and PNG only supported", false);
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../public/Images");
    },
    filename: function (req, file, cb) {
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

router.get("/", (req, res) => {
    Posts.find()
        .select("name postImage -_id ")
        .then((pro) => res.json(pro))
        .catch((err) => res.json({ error: "could not get posts", err }));
});

router.post("/post", upload.single("postImage"), async (req, res) => {
    console.log(req.file);
    const post = new Posts({
        description: req.body.description,
        postImage: req.file,
    });

    try {
        const pro = await post.save();
        res.json(pro);
    } catch (err) {
        res.status(400).json({ error: "could not post product", err });
    }
});


module.exports = router;
