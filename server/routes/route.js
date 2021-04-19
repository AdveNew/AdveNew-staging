const express = require('express');
const controller = require('../controllers/controller.js');

const router = express.Router();

router.get('/calendar', controller.getCalendarData);
router.get('/shopByCalId', controller.getShopByCalId);
router.get('/search', controller.getSearchData);
router.get('/login', controller.getLogin);
router.get('/customer', controller.getCustomer);
router.get('/shop', controller.getShop);
router.get('/getEmailCheck', controller.getEmailCheck);
router.get('/getShopEmailCheck', controller.getShopEmailCheck);
router.get('/trips', controller.getTrips);
router.post('/signup', controller.postSignup);
router.post('/customer', controller.postCustomer);
router.post('/shop', controller.postShop);
router.post('/updateBooking', controller.postUpdateBooking);

// Shop calendar
router.post('/calendar/add', controller.postAddCalendarEvent);
router.put('/calendar/update', controller.putUpdateCalendarEvent);
router.put('/calendar/cancel', controller.putCancelCalendarEvent);

module.exports = router;
