//js
const express = require('express');

const { newGroup, getGroups, joinGroup, openGroup, messages, editGrpDp, image, single, getGroupsList } = require('../controllers/groupController');

const router = express.Router();

router.use("/image", image)

router.post('/create', newGroup);

router.post('/join', joinGroup);

router.post('/open', openGroup);

router.post('/message', messages);

router.post('/editImage', single, editGrpDp);

router.get('/get', getGroups);

router.post('/getGroup', getGroupsList);

module.exports = router;