//js
const express = require('express');

const { image, postImages, single, getImage, regsiterUser, wishList, savedItems, removeSaved, events, rides, remove, removeAndAddInWishlist } = require('../controllers/userPosts');
const { emailSanitizer } = require('../middlewares/Sanitization');

const router = express.Router();

router.use("/image", image)

router.get("/", getImage);

router.get("/events", events);

router.get("/rides", rides);

router.post("/post", single, postImages);

router.post("/join", emailSanitizer, regsiterUser);

router.post("/wishList", emailSanitizer, wishList);

router.post("/savedItems", emailSanitizer, savedItems);

router.post("/removeSaved", emailSanitizer, removeSaved);

router.post("/remove", emailSanitizer, remove);

router.post("/removeAndAddInWishlist", emailSanitizer, removeAndAddInWishlist);

module.exports = router;
