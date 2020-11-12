const mongoose = require('mongoose');

// Server Discover and Monitoring engine, for advenew database
// ? If not local, change `localhost` to `database` or IP location of database
mongoose.connect('mongodb://localhost/advenew', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('[ [ Connected to database. ] ]'))
  .catch((err) => console.error('Error connecting to database', err));

// mongoDB creates unique IDs, so not added to schema
const storeSchema = new mongoose.Schema({
  storeId: Number,
  name: String,
  logo: String,
  phrase: String,
  phoneNumber: String,
  emailAddress: String,
  websiteUrl: String,
  hours: String,
  calendar: [
    {
      id: Number,
      startDate: Date, // stores both data and time
      endDate: Date,
      guide: String,
      price: Number,
      booked: Boolean,
      customerName: String,
      experience: String,
      notes: String,
    },
  ],
  calendar_request: [
    {
      startDate: Date, // stores both data and time
      endDate: Date,
      guide: String,
      price: Number,
      booked: Boolean,
      customerName: String,
      experience: String,
      notes: String,
    },
  ],
});

const customerSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  phoneNumber: String,
  emailAddress: String,
});

// compiling schema into a model
const Store = mongoose.model('Store', storeSchema);
const Customer = mongoose.model('Customer', customerSchema);

module.exports = { Store, Customer };
