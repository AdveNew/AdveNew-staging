import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

import CompanyInfo from './CompanyInfo.jsx';


const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };


export default function DisplayGuideShop(props) {
    const [store] = useState(props.store);
    return (
      <div>
        <CompanyInfo store={store} />
        
      </div>
    );
  }