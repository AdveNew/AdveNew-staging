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
        searchResults: results,
      });
    }
  });
};

module.exports = {
  getCalendarData,
  getSearchData,
};
