const db = require('../../database/index.js');

const getCalendarData = (storeName, callback) => {
  const query = db.Store.find({ name: storeName });
  query.exec((err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
};

const getShopByCalId = (id, callback) => {
  const query = db.Store.find().where({ 'calendar._id': id });
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

const getLogin = (dbCol, emailAddress, password, callback) => {
  switch (dbCol) {
    case 'Customer':
      db.Customer.find({ emailAddress, password },
        (err, results) => {
          if (err || results.length === 0) callback(err, null);
          else callback(null, results);
        });
      break;
    case 'Shop':
      db.Store.find({ emailAddress, password },
        (err, results) => {
          if (err || results === null) callback(err);
          else callback(null, results);
        });
      break;
    case 'Guide':
      db.Guide.find({ emailAddress, password },
        (err, results) => {
          if (err || results === null) callback(err);
          else callback(null, results);
        });
      break;
    default:
      break;
  }
};

const getCustomer = (id, callback) => {
  const query = db.Customer.find().where({ _id: id });
  query.exec((err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results[0]);
    }
  });
};

const getShop = (id, callback) => {
  const query = db.Store.find().where({ _id: id });
  query.exec((err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results[0]);
    }
  });
};

const getTrips = (customerEmail, callback) => {
  const query = db.Store.aggregate([
      {$unwind : "$calendar" }, 
      {$unwind: "$calendar.customerId"}, 
      {$match: {"calendar.customerId": customerEmail}},
      // {$project: {"calendar.customerId":1}}
    ]);
    query.exec((err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
};


const postSignup = (dbCol, name, emailAddress, password, callback) => {
  switch (dbCol) {
    case 'Customer':
      db.Customer.insertMany({ name, emailAddress, password },
        (err, results) => {
          if (err) callback(err);
          else {
            callback(null, results);
          }
        });
      break;
    case 'Shop':
      db.Store.insertMany({ name, emailAddress, password },
        (err, results) => {
          if (err) callback(err);
          else {
            callback(null, results);
          }
        });
      break;
    case 'Guide':
      db.Guide.insertMany({ name, emailAddress, password },
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

const postCustomer = (id, name, emailAddress, phoneNumber, password, callback) => {
  db.Customer.where({ _id: id }).updateOne({
    name, emailAddress, phoneNumber, password,
  },
  (err, results) => {
    if (err) callback(err);
    else {
      callback(null, results);
    }
  });
};

const postShop = (id, name, hours, emailAddress, phoneNumber,
  websiteUrl, details, password, callback) => {
  db.Store.where({ _id: id }).updateOne({
    name, hours, emailAddress, phoneNumber, websiteUrl, details, password,
  },
  (err, results) => {
    if (err) callback(err);
    else {
      callback(null, results);
    }
  });
};

const postUpdateBooking = (calendarId, customerEmail, callback) => {
  console.log("Booked id: ", calendarId)
  db.Store.where({
    'calendar._id': calendarId,
  }).updateOne({
    $set:
      {
        'calendar.$.booked': 1,
        'calendar.$.customerId': customerEmail,
      },
  },
  (err, results) => {
    if (err) callback(err);
    else {
      callback(null, results);
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
  postSignup,
  postCustomer,
  postShop,
  postUpdateBooking,
};
