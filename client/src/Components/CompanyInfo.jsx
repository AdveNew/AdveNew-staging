import React, { useState } from 'react';
import Container from '@material-ui/core/Container/Container.js';

export default function CompanyInfo(props) {
  console.log(props);
  const [store] = useState(props.store);

  return (
    <Container className='companyInfo' maxWidth='xs'>
      <h3><h2 className='companyName'>Company Name:</h2>{store.name}</h3>
      <p>{store.phrase}</p>
      <h4>Company Hours:</h4>{store.hours}
      <h4>Website:</h4>{store.websiteUrl}
      <h4>Phone:</h4>{store.phoneNumber}
      <h4>Email:</h4>{store.emailAddress}
    </Container>
  );
}
