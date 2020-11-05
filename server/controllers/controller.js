const model = require('../models/model.js');

const getCalendarData = (req, res) => {
  const { storeId } = req.query;
  model.getStoreData(storeId, (err, results) => {
    if (err) {
      console.error('Unable to get store from database', err);
    } else {
      console.log('Store data retrieved from database.');
      res.json({
        store: results[0],
      });
    }
  });
};

module.exports = {
  getCalendarData,
};
