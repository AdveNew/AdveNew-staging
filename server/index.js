const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes/route.js');

const PORT = process.env.PORT || 3000;
const app = express();

// middleware
app.use(morgan('dev')); // tokens, req, and res funtionality
app.use(cors()); // cross domain
app.use(express.json());

// serve static assets
app.use(express.static('client/dist'));

// router
app.use('/api', router);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
