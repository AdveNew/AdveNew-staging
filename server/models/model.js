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
  const booked = 0; // 0 = available
  const query = db.Store.find().where({
    'calendar.booked': booked,
    'calendar.location': location,
    'calendar.startDate': { $gte: startDate, $lte: endDate },
    'calendar.endDate': { $gte: startDate, $lte: endDate },
    'calendar.groupSize': { $gte: size },
  });
  query.exec((err, results) => {
    if (err) {
      callback(err);
    } else {
      const resultData = results.map((result) => (
        result.calendar.filter((booking) => (
          booking.location === location
          && booking.groupSize > size
          && booking.startDate >= new Date(startDate)
          && booking.endDate <= new Date(endDate)
          && booking.booked === booked
        ))
      )).flat();
      callback(null, resultData);
    }
  });
};

module.exports = {
  getCalendarData,
  getSearchData,
};
