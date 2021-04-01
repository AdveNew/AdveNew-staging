/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import { CircularProgress, Backdrop } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import Toolbar from '@material-ui/core/Toolbar';

// bottom bar imports
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer/Drawer.js';
import Tooltip from '@material-ui/core/Tooltip/Tooltip.js';
import TodayIcon from '@material-ui/icons/Today';
import HomeIcon from '@material-ui/icons/Home';
import EditIcon from '@material-ui/icons/Edit';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

import InfoIcon from '@material-ui/icons/Info';
import CompanyInfo from './CompanyInfo.jsx';

const useStyles = makeStyles(() => ({
  footer: {
    top: 'auto',
    bottom: 0,
  },
}));

export default function Footer(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [store] = useState(props.store);
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [0]);

  if (loading) {
    return (
      <div className='loading'>
        <Backdrop open>
          <CircularProgress color='inherit' />
        </Backdrop>
      </div>
    );
  }
  return (
    // eslint-disable-next-line react/jsx-fragments
    <React.Fragment>
      <AppBar position='fixed' color='default' className={classes.footer}>
        <Toolbar>
          <Grid container justify='space-evenly' alignItems='center'>
            <Tooltip title='Home' placement='top' component={Link} to='/'>
              <IconButton><HomeIcon /></IconButton>
            </Tooltip>
            <Tooltip title='Calendar' placement='top' component={Link} to='/c1'>
              <IconButton><TodayIcon /></IconButton>
            </Tooltip>
            <Tooltip title='Nearby' placement='top'>
              <IconButton><LocationOnIcon /></IconButton>
            </Tooltip>
            <Tooltip title='Edit Calendar' placement='top'>
              <IconButton label='Edit Calendar' value='edit'><EditIcon /></IconButton>
            </Tooltip>
            <Tooltip title='Send Email' placement='top'>
              <IconButton
                label='Email'
              // eslint-disable-next-line no-return-assign
                onClick={() => window.location.href = 'mailto:customercare@advenew.com?subject=Hey AdveNew'}
              >
                <MailOutlineIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Company Info' placement='top'>
              <IconButton onClick={() => setDrawer(true)}><InfoIcon /></IconButton>
            </Tooltip>
            <Drawer open={drawer} onClose={() => setDrawer(false)}>
              <CompanyInfo store={store} />
            </Drawer>
            <Tooltip title='More Info' placement='top'>
              <IconButton><MoreIcon /></IconButton>
            </Tooltip>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
