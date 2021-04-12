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

const getLogin = (dbCol, email, password, callback) => {
  switch (dbCol) {
    case 'Customer':
      db.Customer.find({ emailAddress: email, password },
        (err, results) => {
          console.log(results);
          if (err || results.length === 0) callback(err, null);
          else callback(null, results);
        });
      break;
    case 'Shop':
      db.Store.find({ emailAddress: email, password },
        (err, results) => {
          if (err || results === null) callback(err);
          else callback(null, results);
        });
      break;
    case 'Guide':
      db.Guide.find({ emailAddress: email, password },
        (err, results) => {
          if (err || results === null) callback(err);
          else callback(null, results);
        });
      break;
    default:
      break;
  }
};

const postSignup = (dbCol, name, email, password, callback) => {
  switch (dbCol) {
    case 'Customer':
      db.Customer.insertMany({ name, emailAddress: email, password },
        (err, results) => {
          if (err) callback(err);
          else {
            callback(null, results);
          }
        });
      break;
    case 'Shop':
      db.Store.insertMany({ name },
        (err, results) => {
          if (err) callback(err);
          else {
            callback(null, results);
          }
        });
      break;
    case 'Guide':
      db.Guide.insertMany({ name },
        (err, results) => {
          if (err) callback(err);
          else {
            callback(null, results);
          }
        });
      break;
    default:
      break;
  }
};

module.exports = {
  getCalendarData,
  getSearchData,
  getLogin,
  postSignup,
};
