const format = require('date-fns/lightFormat');
const db = require('../../database/index.js');

const getCalendarData = (storeId, callback) => {
  const query = db.Store.find({ storeId });
  query.exec((err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
};

const getSearchData = (location, startDate, endDate, size, callback) => {
  const booked = 0;
  const searchData = [];
  console.log(format(new Date(endDate), 'yyyy-MM-dd'));
  const query = db.Store.find({
    'calendar.booked': booked,
    'calendar.location': location,
    'calendar.startDate': { $lte: startDate },
    'calendar.endDate': { $lte: endDate },
    'calendar.groupSize': { $gte: size },
  });
  query.exec((err, results) => {
    if (err) {
      callback(err);
    } else {
      console.log(results);
      callback(null, results);
    }
  });
};

module.exports = {
  getCalendarData,
  getSearchData,
};
