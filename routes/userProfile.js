//js
const express = require('express');

const authenticate = require('../middlewares/FirebaseAdmin')

const { addNew, showProfile, showCreatedCommunity, showMembers, membersParticipated, showJoinedEventsRides, editDp, single, image, profileEdit } = require('../controllers/profile');
const { emailSanitizer } = require('../middlewares/Sanitization');

const router = express.Router();

router.use("/image", image)

router.get("/showJoinedEventsRides", authenticate, showJoinedEventsRides)

router.post("/addNew", addNew)

router.post("/showProfile", emailSanitizer, authenticate, showProfile)

router.post("/showCommunity", emailSanitizer, authenticate, showCreatedCommunity)

router.post("/showMembers", authenticate, showMembers)

router.post("/showJoinedMembers", authenticate, membersParticipated)

router.post("/editImage", single, emailSanitizer, authenticate, editDp)

router.post("/profileEdit", authenticate, profileEdit)

module.exports = router;