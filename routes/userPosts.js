//js
const express = require('express');

const { image, postImages, single, getImage, regsiterUser, wishList, saveItems, removeSaved } = require('../controllers/userPosts');

const router = express.Router();

router.use("/image", image)

router.get("/", getImage);

router.post("/post", single, postImages);

router.post("/join", regsiterUser);

router.post("/wishList", wishList);

router.post("/savedItems", saveItems);

router.post("/removeSaved", removeSaved);

module.exports = router;
