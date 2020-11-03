const express = require('express');
const morgan = require('morgan');
const router = require('./routes/route.js');

const PORT = 3000;
const app = express();

// middleware
app.use(morgan('dev'));
app.use(express.json());

// serve static assets
app.use(express.static('public'));

// router
app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
});