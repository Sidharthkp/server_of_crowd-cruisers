//js
const express = require('express');

const { newGroup, getGroups, joinGroup, openGroup } = require('../controllers/groupController');

const router = express.Router();

router.post('/create', newGroup);

router.post('/join', joinGroup);

router.post('/open', openGroup);

router.get('/get', getGroups);

module.exports = router;