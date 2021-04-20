/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import EventIcon from '@material-ui/icons/Event';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
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
    display: 'block',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  smBreakOption: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  xsBreakOption: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  logo: {
    height: 40,
    marginRight: theme.spacing(1),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  titleLight: {
    textDecoration: 'inherit',
    color: 'white',
  },
  titleDark: {
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
  const route = useLocation();
  const [titleColor, setTitleColor] = useState();
  const [logoColor, setLogoColor] = useState();
  const [toolbarColor, setToolbarColor] = useState('transparent');
  const [elevate, setElevate] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [buttonState, setButtonState] = useState(1);

  // handle button effect based on route
  useEffect(() => {
    if (window.location.pathname === '/') {
      setTitleColor(classes.titleLight);
      setLogoColor(logo);
    } else {
      setTitleColor(classes.titleDark);
      setLogoColor(logoDark);
    }
    switch (window.location.pathname) {
      case '/':
        setButtonState(1);
        break;
      case '/about':
        setButtonState(3);
        break;
      case '/calendar':
        setButtonState(2);
        break;
      case '/trips':
        setButtonState(2);
        break;
      default:
        setButtonState(0);
        break;
    }
  }, [route]);

  // event listener for scrolling effect
  const handleScroll = () => {
    if (window.location.pathname === '/') {
      setTitleColor(window.scrollY > 20 ? classes.titleDark : classes.titleLight);
      setLogoColor(window.scrollY > 20 ? logoDark : logo);
    } else {
      setTitleColor(classes.titleDark);
      setLogoColor(logoDark);
    }
    setToolbarColor(window.scrollY > 20 ? 'default' : 'transparent');
    setElevate(window.scrollY > 20 ? 3 : 0);
  };

  window.addEventListener('scroll', handleScroll);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
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

  return (
    <div>
      <AppBar position='fixed' color={toolbarColor} elevation={elevate}>
        <Toolbar className={classes.toolbar}>
          <Link to='/'>
            <img src={logoColor} alt='AdveNew' className={classes.logo} />
          </Link>
          <Typography className={`${titleColor} ${classes.xsBreakOption}`} variant='h6' component={Link} to='/'>
            AdveNew
          </Typography>
          <div className={classes.headerOptions}>
            <Button className={classes.xsBreakOption} variant='contained' size='medium' color={buttonState === 1 ? 'secondary' : 'default'} startIcon={<SearchIcon />} style={{ marginRight: '20px' }} component={Link} to='/'>
              Find a Guide
            </Button>
            {isAuthed && authType === 'Shop'
              ? (
                <Button variant='contained' size='medium' color={buttonState === 2 ? 'secondary' : 'default'} startIcon={<EventIcon />} style={{ marginRight: '20px' }} component={Link} to='/calendar'>
                  Calendar
                </Button>
              )
              : null }
            {isAuthed && authType === 'Customer'
              ? (
                <Button variant='contained' size='medium' color={buttonState === 2 ? 'secondary' : 'default'} startIcon={<EventIcon />} component={Link} to='/trips' style={{ marginRight: '20px' }}>
                  My Trips
                </Button>
              )
              : null }
            <Button className={classes.smBreakOption} variant='contained' size='medium' color={buttonState === 3 ? 'secondary' : 'default'} startIcon={<InfoIcon />} component={Link} to='/about'>
              About Us
            </Button>
          </div>
          <div>
            <IconButton
              edge='end'
              aria-label='account of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
              color='inherit'
              className={titleColor}
            >
              <AccountCircle />
            </IconButton>
          </div>
          <Login open={openLogin} onClose={() => setOpenLogin(false)} />
          <Signup open={openSignup} onClose={() => setOpenSignup(false)} />
          <Logout
            open={openLogout}
            onClose={() => setOpenLogout(false)}
            buttonState={() => setButtonState(1)}
          />
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}
