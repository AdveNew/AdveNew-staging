const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_PUBLIC);

const router = require('./routes/route.js');

const PORT = process.env.PORT || 3000;
const app = express();

// middleware
app.use(morgan('dev')); // tokens, req, and res funtionality
app.use(cors()); // cross domain
app.use(express.json());

// serve static assets
app.use(express.static('client/dist'));

// endpoint for server side requests to db
app.use('/api', router);

// handle anything from root for react router (front-end)
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Stripe payment handling (server-side to prevent fraud)
app.post('/payment', async (req, res) => {
  const { price, guideName, token } = req.body;
  const customer = await stripe.customers.create({
    email: token.email,
    source: token.id,
  });
  // Create a PaymentIntent with the order amount and currency
  const charge = await stripe.charges.create({
    amount: price * 100,
    currency: 'usd',
    customer: customer.id,
    receipt_email: token.email,
    description: `Purchased guide trip with ${guideName} for $${price}`,
  });
  res.send({ charge });
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
