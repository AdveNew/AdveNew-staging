const model = require('../models/model.js');

/* ************ GET CONTROLLERS ************ */
const getCalendarData = (req, res) => {
  const { storeName } = req.query;
  model.getCalendarData(storeName, (err, results) => {
    if (err) {
      console.error('  ✗  Unable to get store from database', err);
    } else {
      console.log('  ✓  Store data retrieved from database.');
      res.json({
        store: results[0],
      });
    }
  });
};

const getShopByCalId = (req, res) => {
  const { id } = req.query;
  model.getShopByCalId(id, (err, results) => {
    if (err) {
      console.error('  ✗  Unable to get store from database', err);
    } else {
      console.log('  ✓  Store data retrieved from database.');
      res.json({
        store: results[0],
      });
    }
  });
};

const getSearchData = (req, res) => {
  const {
    location, startDate, endDate, size,
  } = req.query;
  model.getSearchData(location, startDate, endDate, size, (err, results) => {
    if (err) {
      console.error('  ✗  Unable to get store from database', err);
    } else {
      console.log('  ✓  Store data retrieved from database.');
      res.json({
        results,
      });
    }
  });
};

const getLogin = (req, res) => {
  const {
    dbCol, emailAddress, password,
  } = req.query;
  model.getLogin(dbCol, emailAddress, password, (err, results) => {
    if (err || results === null) {
      console.error('  ✗  Unable to get user from database', err);
      res.status(401).send();
    } else {
      console.log('  ✓  User data retrieved from database.');
      res.json({
        user: results[0],
        // eslint-disable-next-line no-underscore-dangle
        token: results[0]._id,
      });
    }
  });
};

const getCustomer = (req, res) => {
  const { id } = req.query;
  model.getCustomer(id, (err, results) => {
    if (err || results === null) {
      console.error('  ✗  Unable to get customer from database', err);
      res.status(401).send();
    } else {
      console.log('  ✓  Customer data retrieved from database.');
      res.json({
        customer: results,
      });
    }
  });
};

const getShop = (req, res) => {
  const { id } = req.query;
  model.getShop(id, (err, results) => {
    if (err || results === null) {
      console.error('  ✗  Unable to get shop from database', err);
      res.status(401).send();
    } else {
      console.log('  ✓  Shop data retrieved from database.');
      res.json({
        shop: results,
      });
    }
  });
};

const getTrips = (req, res) => {
  const { customerEmail } = req.query;
  model.getTrips(customerEmail, (err, results) => {
    if (err) {
      console.error('  ✗  Unable to get customer trips from database', err);
      res.status(401).send();
    } else {
      console.log('  ✓  Customer trips retrieved from database.');
      res.json({
        trips: results,
      });
    }
  });
};

const getEmailCheck = (req, res) => {
  const { email } = req.query;
  model.getEmailCheck(email, (err, results) => {
    if (err) {
      console.error('  ✗  Unable to check customer email in database', err);
      res.status(401).send();
    } else {
      console.log('  ✓  Customer email checked in database.');
      res.json({
        checked: results,
      });
    }
  });
};

const getShopEmailCheck = (req, res) => {
  const { email } = req.query;
  model.getEmailCheck(email, (err, results) => {
    if (err) {
      console.error('  ✗  Unable to check customer email in database', err);
      res.status(401).send();
    } else {
      console.log('  ✓  Customer email checked in database.');
      res.json({
        checked: results,
      });
    }
  });
};

/* ************ POST CONTROLLERS ************ */
const postSignup = (req, res) => {
  const {
    dbCol, name, emailAddress, password,
  } = req.body.params;
  model.postSignup(dbCol, name, emailAddress, password, (err, results) => {
    if (err) {
      console.error('  ✗  Unable to store signup to database', err);
      res.status(503).send();
    } else {
      console.log('  ✓  Saved credentials to database.');
      res.json({
        results,
      });
    }
  });
};

const postCustomer = (req, res) => {
  const {
    id, name, emailAddress, phoneNumber, password,
  } = req.body.params;
  model.postCustomer(id, name, emailAddress, phoneNumber, password, (err, results) => {
    if (err) {
      console.error('  ✗  Unable to update customer in database', err);
      res.status(401).send();
    } else {
      console.log(`  ✓  Updated customer ${emailAddress} in database.`);
      res.json({
        results,
      });
    }
  });
};

const postShop = (req, res) => {
  const {
    id, name, hours, emailAddress, phoneNumber, websiteUrl, details, password,
  } = req.body.params;
  model.postShop(id, name, hours,
    emailAddress, phoneNumber, websiteUrl,
    details, password, (err, results) => {
      if (err) {
        console.error('  ✗  Unable to update shop in database', err);
        res.status(401).send();
      } else {
        console.log(`  ✓  Updated shop ${emailAddress} in database.`);
        res.json({
          results,
        });
      }
    });
};

const postUpdateBooking = (req, res) => {
  const { calendarId, customerEmail } = req.body.params;
  console.log("Post update booking: ", customerEmail);
  model.postUpdateBooking(calendarId, customerEmail, (err, results) => {
    if (err) {
      console.error('  ✗  Unable to update booking in database', err);
      res.status(401).send();
    } else {
      console.log(`  ✓  Updated booking ${customerEmail} in database.`);
      res.status(200).json({
        results,
      });
    }
  });
};

module.exports = {
  getCalendarData,
  getShopByCalId,
  getSearchData,
  getLogin,
  getCustomer,
  getShop,
  getTrips,
  getEmailCheck,
  getShopEmailCheck,
  postSignup,
  postCustomer,
  postShop,
  postUpdateBooking,
};
