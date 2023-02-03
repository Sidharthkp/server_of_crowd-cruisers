//js
const express = require('express');

const { addNew } = require('../controllers/profile');

const router = express.Router();

router.post("/addNew", addNew)

module.exports = router;