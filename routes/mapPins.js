//js
const express = require('express');

const authenticate = require('../middlewares/FirebaseAdmin')

const { getPin, newPin, deletePin } = require('../controllers/mapController');

const router = express.Router();

router.get('/', authenticate, getPin);

router.post('/', authenticate, newPin);

router.post('/pinDelete', authenticate, deletePin);

module.exports = router;