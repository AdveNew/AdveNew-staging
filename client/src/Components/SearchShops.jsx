/* eslint-disable import/extensions */
import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
 
  FormControl,
  TextField,

} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import Button from '@material-ui/core/Button';

const handleSearchChange = (local) => {
  setLocation(local.target.value);
};


export default function SearchShops(props) {

  return (
    <div>
      <form  noValidate autoComplete='off'>
      <FormControl >
      <TextField
          required
          label='Search'
          onChange={handleLocationChange}
          margin='normal'
          variant='filled'
          InputLabelProps={{
            shrink: true,
          }}
        />
      </FormControl>
      </form>
     <Button component={Link} to='/displayGuideShop'>f</Button>
     {/* <Button component={Link} to='/c1'>
                Calendar
              </Button> */}
     {/* <Button  onClick={() => { handleButtonClick(2); }} onClick={() => { handleButtonClick(1); }} color={buttonState === 1 ? 'secondary' : 'default'} >
                Calendar
              </Button> */}
      here
    </div>
  );
}
