const mongoose = require('mongoose');

// Server Discover and Monitoring engine, for advenew database
// ? If not local, change `localhost` to `database` or IP location of database
const uri = 'mongodb://localhost/advenew';
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(uri, options)
  .then(() => console.log('[ [ Connected to database. ] ]'))
  .catch((err) => console.error('Error connecting to database', err));

mongoose.set('autoCreate', true);
mongoose.set('useCreateIndex', true);

// mongoDB creates unique IDs, so not added to schema
const storeSchema = new mongoose.Schema({
  details: { type: String, default: '' },
  emailAddress: { type: String, default: '', unique: true },
  hours: { type: String, default: '' },
  logo: { type: String, default: '' },
  name: { type: String, default: '' },
  phoneNumber: { type: String, default: '' },
  password: { type: String, default: 'password' },
  websiteUrl: { type: String, default: '' },
  calendar: [
    {
      id: Number,
      accommodations: String,
      booked: Number, // -2, -1, 0, 1
      cancellationHours: Number,
      customerEmail: String,
      endDate: Date,
      experience: { type: String, default: 'Beginner' },
      groupSize: { type: Number, default: '1' },
      guide: String,
      hobby: String,
      location: { type: String, default: 'Colorado' },
      notes: { type: String, default: 'none' },
      price: { type: Number, default: '200' },
      startDate: Date, // stores both data and time
    },
  ],
});

const guideSchema = new mongoose.Schema({
  avatar: { type: String, default: '' },
  emailAddress: { type: String, default: '', unique: true },
  location: { type: String, default: '' },
  name: { type: String, default: '' },
  password: { type: String, default: 'password' },
  phoneNumber: { type: String, default: '' },
});

const customerSchema = new mongoose.Schema({
  avatar: { type: String, default: '' },
  emailAddress: { type: String, default: '', unique: true },
  location: { type: String, default: '' },
  name: { type: String, default: '' },
  password: { type: String, default: 'password' },
  phoneNumber: { type: String, default: '' },
});

// compiling schema into a model
const Store = mongoose.model('Store', storeSchema);
const Guide = mongoose.model('Guide', guideSchema);
const Customer = mongoose.model('Customer', customerSchema);

module.exports = { Store, Guide, Customer };
