//js
const express = require('express');

const { addNew, showProfile, showCreatedCommunity, showMembers, membersParticipated, showJoinedEventsRides } = require('../controllers/profile');

const router = express.Router();

router.get("/showJoinedEventsRides", showJoinedEventsRides)

router.post("/addNew", addNew)

router.post("/showProfile", showProfile)

router.post("/showCommunity", showCreatedCommunity)

router.post("/showMembers", showMembers)

router.post("/showJoinedMembers", membersParticipated)

module.exports = router;