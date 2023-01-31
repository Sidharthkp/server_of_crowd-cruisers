//js
const express = require('express');

const { newGroup } = require('../controllers/groupController');

const router = express.Router();

router.post('/create', newGroup);

module.exports = router;