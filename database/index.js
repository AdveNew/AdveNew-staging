const mongoose = require('mongoose');

// Server Discover and Monitoring engine, for advenew database
// ? If not local, change `localhost` to `database` or IP location of database
mongoose.connect('mongodb://localhost/advenew', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('[ [ Connected to database. ] ]'))
  .catch((err) => console.error('Error connecting to database', err));

// mongoDB creates unique IDs, so not added to schema
const storeSchema = new mongoose.Schema({
  storeId: Number,
  details: String,
  emailAddress: String,
  hours: String,
  logo: String,
  name: String,
  phoneNumber: String,
  websiteUrl: String,
  calendar: [
    {
      id: Number,
      accommodations: String,
      booked: Number, // -2, -1, 0, 1
      cancellationHours: Number,
      customerId: Number,
      endDate: Date,
      experience: String,
      guide: String,
      location: String,
      notes: String,
      price: Number,
      groupSize: Number,
      startDate: Date, // stores both data and time
    },
  ],
});

const customerSchema = new mongoose.Schema({
  customerId: Number,
  avatar: String,
  emailAddress: String,
  location: String,
  name: String,
  phoneNumber: String,
});

// compiling schema into a model
const Store = mongoose.model('Store', storeSchema);
const Customer = mongoose.model('Customer', customerSchema);

module.exports = { Store, Customer };
