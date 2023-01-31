//js
const express = require('express');

const { newGroup, getGroups } = require('../controllers/groupController');

const router = express.Router();

router.post('/create', newGroup);

router.get('/get', getGroups);

module.exports = router;