//js
const express = require('express');

const { getPin, newPin, deletePin } = require('../controllers/mapController');

const router = express.Router();

router.get('/', getPin);

router.post('/', newPin);

router.post('/pinDelete', deletePin);

module.exports = router;