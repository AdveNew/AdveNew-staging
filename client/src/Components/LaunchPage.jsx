import React, { useState } from 'react';

export default function LaunchPage(props) {
  console.log(props);
  const [store] = useState(props.store);

  return (
    <div className='body'>
      <h2 className='header'>Company Name: {store.name}</h2>
      <span>{store.phrase}</span>
      <h3>
        Company Hours: {store.hours} &nbsp;
        Website: {store.websiteUrl}
      </h3>
      <h3>
        Phone: {store.phoneNumber} &nbsp;
        Email: {store.emailAddress}
      </h3>
    </div>
  );
}
