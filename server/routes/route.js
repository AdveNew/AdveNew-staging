const express = require('express');

const router = express.Router();
const controller = require('../controllers/controller.js');

router.get('/calendar', controller.getCalendarData);

module.exports = router;
