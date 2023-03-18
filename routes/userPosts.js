//js
const express = require('express');

const authenticate = require('../middlewares/FirebaseAdmin')

const { image, postImages, single, getImage, regsiterUser, wishList, savedItems, removeSaved, events, rides, remove, removeAndAddInWishlist } = require('../controllers/userPosts');
const { emailSanitizer } = require('../middlewares/Sanitization');

const router = express.Router();

router.use("/image", image)

router.get("/", getImage);

router.get("/events", authenticate, events);

router.get("/rides", authenticate, rides);

router.post("/post", single, authenticate, postImages);

router.post("/join", emailSanitizer, authenticate, regsiterUser);

router.post("/wishList", emailSanitizer, authenticate, wishList);

router.post("/savedItems", emailSanitizer, authenticate, savedItems);

router.post("/removeSaved", emailSanitizer, authenticate, removeSaved);

router.post("/remove", emailSanitizer, authenticate, remove);

router.post("/removeAndAddInWishlist", emailSanitizer, authenticate, removeAndAddInWishlist);

module.exports = router;
