//js
const express = require('express');

const { image, postImages, single, getImage, regsiterUser, wishList, saveItems, removeSaved, events, rides, remove } = require('../controllers/userPosts');

const router = express.Router();

router.use("/image", image)

router.get("/", getImage);

router.get("/events", events);

router.get("/rides", rides);

router.post("/post", single, postImages);

router.post("/join", regsiterUser);

router.post("/wishList", wishList);

router.post("/savedItems", saveItems);

router.post("/removeSaved", removeSaved);

router.post("/remove", remove);

router.post("/removeAndAddInWishlist", removeAndAddInWishlist);

module.exports = router;
