//js
const express = require('express');

const { image, postImages, single, getImage } = require('../controllers/userPosts');

const router = express.Router();

router.use("/image", image)

router.get("/", getImage);

router.post("/post", single, postImages);

module.exports = router;

module.exports = router;
