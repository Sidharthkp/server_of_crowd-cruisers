//js
const express = require('express');

const { getPin, newPin } = require('../controllers/mapController');

const router = express.Router();

router.get('/', getPin);

router.post('/', newPin);

module.exports = router;