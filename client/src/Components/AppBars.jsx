/* eslint-disable import/extensions */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/Mail';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreIcon from '@material-ui/icons/MoreVert';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

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
import * as SVG from './svgFiles.jsx';
import CompanyInfo from './CompanyInfo.jsx';

const useStyles = makeStyles((theme) => ({
  footer: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  logo: {
    height: 40,
    marginRight: theme.spacing(1),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    color: trigger ? 'default' : 'transparent',
  });
}

export function Header() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label='show 4 new mails' color='inherit'>
          <Badge badgeContent={4} color='secondary'>
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label='show 11 new notifications' color='inherit'>
          <Badge badgeContent={11} color='secondary'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <ElevationScroll>
        <AppBar position='fixed' color='transparent' elevation={0}>
          <Toolbar>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='open drawer'
            >
              <MenuIcon />
            </IconButton>
            {SVG.handmadeIconSVG}
            <Typography className={classes.title} variant='h6' noWrap>
              AdveNew
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Tooltip title='Messages' placement='bottom'>
                <IconButton aria-label='show 4 new mails' color='inherit'>
                  <Badge badgeContent={4} color='secondary'>
                    <MailIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title='Notifications' placement='bottom'>
                <IconButton aria-label='show 17 new notifications' color='inherit'>
                  <Badge badgeContent={17} color='secondary'>
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <IconButton
                edge='end'
                aria-label='account of current user'
                aria-controls={menuId}
                aria-haspopup='true'
                onClick={handleProfileMenuOpen}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label='show more'
                aria-controls={mobileMenuId}
                aria-haspopup='true'
                onClick={handleMobileMenuOpen}
                color='inherit'
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

/* ***************** */
/* Simple footer bar */
export function Footer(props) {
  const classes = useStyles();
  const [store] = useState(props.store);
  const [drawer, setDrawer] = useState(false);

  return (
    // eslint-disable-next-line react/jsx-fragments
    <React.Fragment>
      <AppBar position='fixed' color='default' className={classes.footer}>
        <Toolbar>
          <Grid container justify='space-evenly' alignItems='center'>
            <Tooltip title='Calendar' placement='top'>
              <IconButton><TodayIcon /></IconButton>
            </Tooltip>
            <Tooltip title='Home' placement='top'>
              <IconButton><HomeIcon /></IconButton>
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
                onClick={() => window.location.href = 'mailto:customercare@advenew.com?subject=Hello AdveNew'}
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
