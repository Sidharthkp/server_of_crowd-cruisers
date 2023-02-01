//js
const express = require('express');

const { newGroup, getGroups, joinGroup } = require('../controllers/groupController');

const router = express.Router();

router.post('/create', newGroup);

router.post('/join', joinGroup);

router.get('/get', getGroups);

module.exports = router;