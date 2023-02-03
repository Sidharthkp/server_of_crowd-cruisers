//js
const express = require('express');

const { addNew, showProfile, showCreatedCommunity } = require('../controllers/profile');

const router = express.Router();

router.post("/addNew", addNew)

router.post("/showProfile", showProfile)

router.post("/showCommunity", showCreatedCommunity)

module.exports = router;