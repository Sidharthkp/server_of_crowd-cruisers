//js
const express = require('express');

const { addNew, showProfile, showCreatedCommunity, showMembers, membersParticipated, showJoinedEventsRides, editDp, single, image, profileEdit } = require('../controllers/profile');
const { emailSanitizer } = require('../middlewares/Sanitization');

const router = express.Router();

router.use("/image", image)

router.get("/showJoinedEventsRides", showJoinedEventsRides)

router.post("/addNew", addNew)

router.post("/showProfile", emailSanitizer, showProfile)

router.post("/showCommunity", emailSanitizer, showCreatedCommunity)

router.post("/showMembers", showMembers)

router.post("/showJoinedMembers", membersParticipated)

router.post("/editImage", single, editDp)

router.post("/profileEdit", profileEdit)

module.exports = router;