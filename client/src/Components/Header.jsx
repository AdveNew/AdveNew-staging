/* eslint-disable import/extensions */
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import EventIcon from '@material-ui/icons/Event';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import MailIcon from '@material-ui/icons/Mail';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreIcon from '@material-ui/icons/MoreVert';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip/Tooltip.js';
import Typography from '@material-ui/core/Typography';
// import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import logo from '../../dist/logo.png';
import logoDark from '../../dist/logo_dark.png';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Logout from './Logout.jsx';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
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
  titleLight: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    textDecoration: 'inherit',
    color: 'white',
  },
  titleDark: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    textDecoration: 'inherit',
    color: 'inherit',
  },
  toolbar: {
    minHeight: '80',
  },
}));

export default function Header() {
  const classes = useStyles();
  const isAuthed = (JSON.parse(localStorage.getItem('user.token')) !== null);
  const authType = localStorage.getItem('user.loginType');
  const routeLoc = (useLocation().pathname === '/');
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [buttonState, setButtonState] = useState(1);

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

  // function ElevationScroll({ children }) {
  //   const trigger = useScrollTrigger({
  //     // disableHysteresis: true,
  //     threshold: 0,
  //   });

  //   return React.cloneElement(children, {
  //     elevation: trigger ? 1 : 0,
  //     color: trigger ? 'default' : 'transparent',
  //   });
  // }

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
      {isAuthed
        ? (
          <MenuItem
            onClick={handleMenuClose}
            component={Link}
            to={authType === 'Shop' ? '/company_profile' : '/profile'}
          >
            Profile
          </MenuItem>
        ) : null}
      {isAuthed && authType !== 'Shop' ? <MenuItem onClick={handleMenuClose}>My Trips</MenuItem> : null}
      {!isAuthed
        ? <MenuItem onClick={() => { setOpenLogin(true); handleMenuClose(); }}>Log In</MenuItem>
        : null }
      {!isAuthed
        ? <MenuItem onClick={() => { setOpenSignup(true); handleMenuClose(); }}>Sign Up</MenuItem>
        : null }
      {isAuthed
        ? <MenuItem onClick={() => { setOpenLogout(true); handleMenuClose(); }}>Log Out</MenuItem>
        : null }
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      className={routeLoc ? classes.titleLight : classes.titleDark}
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
    <div>
      {/* <ElevationScroll> */}
      <AppBar position='fixed' color='transparent' elevation={0}>
        <Toolbar className={classes.toolbar}>
          <img src={routeLoc ? logo : logoDark} alt='AdveNew' className={classes.logo} />
          {/* <div> {SVG.advenewLogo} </div> */}
          <Typography className={routeLoc ? classes.titleLight : classes.titleDark} variant='h6' component={Link} to='/'>
            AdveNew
          </Typography>
          <div className={classes.headerOptions}>
            <Button variant='contained' size='medium' onClick={() => setButtonState(1)} color={buttonState === 1 ? 'secondary' : 'default'} startIcon={<SearchIcon />} style={{ marginRight: '20px' }} component={Link} to='/'>
              Find a Guide
            </Button>
            {isAuthed && authType === 'Shop'
              ? (
                <Button variant='contained' size='medium' onClick={() => setButtonState(2)} color={buttonState === 2 ? 'secondary' : 'default'} startIcon={<EventIcon />} style={{ marginRight: '20px' }} component={Link} to='/calendar'>
                  Calendar
                </Button>
              )
              : null }
            {isAuthed && authType === 'Guide'
              ? (
                <Button variant='contained' size='medium' onClick={() => setButtonState(2)} color={buttonState === 2 ? 'secondary' : 'default'} startIcon={<EventIcon />} style={{ marginRight: '20px' }}>
                  My Trips
                </Button>
              )
              : null }
            {isAuthed
              ? (
                <Button variant='contained' size='medium' onClick={() => setButtonState(3)} color={buttonState === 3 ? 'secondary' : 'default'} startIcon={<InfoIcon />} component={Link} to='/about'>
                  About Us
                </Button>
              )
              : null}
          </div>
          {/* <div className={classes.grow} /> */}
          <div className={classes.sectionDesktop}>
            {isAuthed
              ? (
                <Tooltip title='Messages' placement='bottom'>
                  <IconButton aria-label='show 4 new mails' className={routeLoc ? classes.titleLight : classes.titleDark}>
                    <Badge badgeContent={4} color='primary'>
                      <MailIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
              ) : null }
            {isAuthed
              ? (
                <Tooltip title='Notifications' placement='bottom'>
                  <IconButton aria-label='show 17 new notifications' className={routeLoc ? classes.titleLight : classes.titleDark}>
                    <Badge badgeContent={17} color='primary'>
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
              ) : null }
            <IconButton
              edge='end'
              aria-label='account of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
              color='inherit'
              className={routeLoc ? classes.titleLight : classes.titleDark}
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
          <Login open={openLogin} onClose={() => setOpenLogin(false)} />
          <Signup open={openSignup} onClose={() => setOpenSignup(false)} />
          <Logout open={openLogout} onClose={() => setOpenLogout(false)} />
        </Toolbar>
      </AppBar>
      {/* </ElevationScroll> */}
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
