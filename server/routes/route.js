const express = require('express');
const controller = require('../controllers/controller.js');

const router = express.Router();
router.get('/calendar', controller.getCalendarData);
router.get('/search', controller.getSearchData);
router.get('/login', controller.getLogin);
router.post('/signup', controller.postSignup);

module.exports = router;
