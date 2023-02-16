//js
const express = require('express');

const { image, postImages, single, getImage, regsiterUser, wishList, savedItems, removeSaved, events, rides, remove, removeAndAddInWishlist } = require('../controllers/userPosts');

const router = express.Router();

router.use("/image", image)

router.get("/", getImage);

router.get("/events", events);

router.get("/rides", rides);

router.post("/post", single, postImages);

router.post("/join", regsiterUser);

router.post("/wishList", wishList);

router.post("/savedItems", savedItems);

router.post("/removeSaved", removeSaved);

router.post("/remove", remove);

router.post("/removeAndAddInWishlist", removeAndAddInWishlist);

module.exports = router;
