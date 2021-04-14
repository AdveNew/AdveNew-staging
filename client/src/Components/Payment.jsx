/* eslint-disable import/extensions */
import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import icon from '../../dist/logo_dark.png';

const useStyles = makeStyles(() => ({
  StripeCheckout: {
    padding: '0 !important',
    height: '70px',
    width: '90px',
    border: '1px solid grey !important',
    borderRadius: '0 !important',
    boxShadow: 'unset !important',
  },
  span: {
    all: 'unset !important',
  },
}));

export default function Payment(props) {
  const classes = useStyles();
  const [price] = useState(props.price);
  const [guideName] = useState(props.guideName);
  const PORT = process.env.PORT || 3000;

  const handleToken = (token) => {
    axios.post(`http://localhost:${PORT}/payment`, {
      price,
      guideName,
      token,
    })
      .then((data) => {
        if (data.status === 200) {
          // axios.post(`http://localhost:${PORT}/addpayment`, {
          //   price,
          //   guideName,
          // })
          //   .catch((err) => console.log('Error adding payment to db', err.message));
          console.log('Payment complete');
        } else console.log('error completing payment using stripe');
      })
      .catch((err) => console.log('Failed to post payment', err));
  };

  return (
    <StripeCheckout
      name='Payment'
      description={`Paying ${guideName} $${price}. Thank you.`}
      label={`$${price}`}
      stripeKey='pk_test_51ITi5uEQVMlmkh1VEqOXWiYahOcRaLEREdZuWnXjaFqwyRld8FGr8azn4Yf4hfndtK4rLRTSRJFp6cXvWikMTRcE00vRiqCOgN'
      token={handleToken}
      zipCode
      image={icon}
      amount={price * 100}
      className={classes.textField}
    />
  );
}
