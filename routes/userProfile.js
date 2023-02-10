//js
const express = require('express');

const { addNew, showProfile, showCreatedCommunity, showMembers, membersParticipated, showJoinedEventsRides, editDp, showDp, single, image } = require('../controllers/profile');

const router = express.Router();

router.use("/image", image)

router.get("/showJoinedEventsRides", showJoinedEventsRides)

router.get("/showDp", showDp)

router.post("/addNew", addNew)

router.post("/showProfile", showProfile)

router.post("/showCommunity", showCreatedCommunity)

router.post("/showMembers", showMembers)

router.post("/showJoinedMembers", membersParticipated)

router.post("/editImage", single, editDp)

module.exports = router;