/* eslint-disable import/extensions */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import EventIcon from '@material-ui/icons/Event';
import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/Mail';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreIcon from '@material-ui/icons/MoreVert';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip/Tooltip.js';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import * as SVG from './svgFiles.jsx';
import logo from '../../dist/logo.png';

const useStyles = makeStyles((theme) => ({
  headerOptions: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  logo: {
    height: 40,
    marginRight: theme.spacing(1),
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  toolbar: {
    minHeight: '80',
  },
}));

export default function Header() {
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

  function ElevationScroll({ children }) {
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 1,
    });

    return React.cloneElement(children, {
      elevation: trigger ? 1 : 0,
      color: trigger ? 'default' : 'transparent',
    });
  }

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
          <Badge badgeContent={4} color='primary'>
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label='show 11 new notifications' color='inherit'>
          <Badge badgeContent={11} color='primary'>
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
        <AppBar position='fixed' color='transparent !important' elevation='0'>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='open drawer'
            >
              <MenuIcon />
            </IconButton>
            <img src={logo} alt='AdveNew' className={classes.logo} />
            <div> {SVG.advenewLogo} </div>
            <Typography className={classes.title} variant='h6'>
              AdveNew
            </Typography>
            <div className={classes.headerOptions}>
              <Button variant='contained' size='small' color='secondary' startIcon={<SearchIcon />} style={{ marginRight: '20px' }}>
                Find a Guide
              </Button>
              <Button variant='contained' size='small' color='default' startIcon={<EventIcon />} style={{ marginRight: '20px' }}>
                Calendar
              </Button>
              <Button variant='contained' size='small' color='default' startIcon={<SearchIcon />}>
                Search Shops
              </Button>
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Tooltip title='Messages' placement='bottom'>
                <IconButton aria-label='show 4 new mails' color='inherit'>
                  <Badge badgeContent={4} color='primary'>
                    <MailIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title='Notifications' placement='bottom'>
                <IconButton aria-label='show 17 new notifications' color='inherit'>
                  <Badge badgeContent={17} color='primary'>
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
