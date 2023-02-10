//js
const express = require('express');

const { addNew, showProfile, showCreatedCommunity, showMembers, membersParticipated, showJoinedEventsRides, editDp, single, image } = require('../controllers/profile');

const router = express.Router();

router.use("/image", image)

router.get("/showJoinedEventsRides", showJoinedEventsRides)

router.post("/addNew", addNew)

router.post("/showProfile", showProfile)

router.post("/showCommunity", showCreatedCommunity)

router.post("/showMembers", showMembers)

router.post("/showJoinedMembers", membersParticipated)

router.post("/editImage", single, editDp)

module.exports = router;