//js
const express = require('express');

const { addNew, showProfile, showCreatedCommunity, showMembers } = require('../controllers/profile');

const router = express.Router();

router.post("/addNew", addNew)

router.post("/showProfile", showProfile)

router.post("/showCommunity", showCreatedCommunity)

router.post("/showMembers", showMembers)

module.exports = router;