const model = require('../models/model.js');

/* ************ GET CONTROLLERS ************ */
const getCalendarData = (req, res) => {
  const { storeEmail } = req.query;
  model.getCalendarData(storeEmail, (err, results) => {
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

const postAddCalendarEvent = (req, res) => {
  const {
    id, emailAddress, booked, endDate, guide, startDate,
  } = req.body.params;

  const toAdd = {
    booked,
    endDate,
    guide,
    startDate,
  };

  Object.keys(toAdd).forEach((k) => {
    // eslint-disable-next-line no-unused-expressions
    (!toAdd[k] && toAdd[k] !== undefined) && delete toAdd[k];
  });

  console.log(toAdd);

  model.postAddCalendarEvent(emailAddress, id, toAdd, (err, results) => {
    if (err) {
      console.error('  ✗  Unable to add booking in database', err);
      res.status(401).send();
    } else {
      console.log(`  ✓  Added booking with ${id} in database.`);
      res.status(200).json({
        results,
      });
    }
  });
};

/* ************ PUT CONTROLLERS ************ */
const putUpdateCalendarEvent = (req, res) => {
  const {
    id, emailAddress, booked, endDate, guide, startDate,
  } = req.body.params;

  const toUpdate = {
    'calendar.$.booked': booked,
    'calendar.$.endDate': endDate,
    'calendar.$.guide': guide,
    'calendar.$.startDate': startDate,
  };

  Object.keys(toUpdate).forEach((k) => {
    // eslint-disable-next-line no-unused-expressions
    (!toUpdate[k] && toUpdate[k] !== undefined) && delete toUpdate[k];
  });

  model.putUpdateCalendarEvent(id, emailAddress, toUpdate, (err, results) => {
    if (err) {
      console.error('  ✗  Unable to update booking in database', err);
      res.status(401).send();
    } else {
      console.log(`  ✓  Updated booking ${id} in database.`);
      res.status(200).json({
        results,
      });
    }
  });
};

const putCancelCalendarEvent = (req, res) => {
  const { emailAddress, id } = req.body.params;
  model.putCancelCalendarEvent(emailAddress, id, (err, results) => {
    if (err) {
      console.error('  ✗  Unable to cancel booking in database', err);
      res.status(401).send();
    } else {
      console.log(`  ✓  Cancelled booking ${id} in database.`);
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
  postAddCalendarEvent,
  putUpdateCalendarEvent,
  putCancelCalendarEvent,
};
