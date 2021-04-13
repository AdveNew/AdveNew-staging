const model = require('../models/model.js');

const getCalendarData = (req, res) => {
  const { storeId } = req.query;
  model.getCalendarData(storeId, (err, results) => {
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

module.exports = {
  getCalendarData,
  getSearchData,
  getLogin,
  postSignup,
};
