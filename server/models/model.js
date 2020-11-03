const db = require('../../database/index.js');

const getCalendarData = (storeId, callback) => {
  const query = db.Product.find({ store_id: storeId });
  query.exec((err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
};

module.exports = {
  getCalendarData,
};