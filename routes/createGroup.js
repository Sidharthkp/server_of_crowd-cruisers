//js
const express = require('express');

const authenticate = require('../middlewares/FirebaseAdmin')

const { newGroup, getGroups, joinGroup, openGroup, messages, editGrpDp, image, single, getGroupsList, editGrpName } = require('../controllers/groupController');

const router = express.Router();

router.use("/image", image)

router.post('/create', authenticate,  newGroup);

router.post('/join', authenticate, joinGroup);

router.post('/open', authenticate, openGroup);

router.post('/message', authenticate, messages);

router.post('/editImage', single, authenticate, editGrpDp);

router.post('/editGroupName', authenticate, editGrpName);

router.get('/get', authenticate, getGroups);

router.post('/getGroup', authenticate, getGroupsList);

module.exports = router;