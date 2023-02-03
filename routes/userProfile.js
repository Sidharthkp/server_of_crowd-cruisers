//js
const express = require('express');

const { addNew, showProfile } = require('../controllers/profile');

const router = express.Router();

router.post("/addNew", addNew)

router.post("/showProfile", showProfile)

module.exports = router;