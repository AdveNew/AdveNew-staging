/* eslint-disable import/extensions */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/prefer-default-export */
import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { green, blue, yellow } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper/Paper.js';
import Container from '@material-ui/core/Container/Container.js';
import Grid from '@material-ui/core/Grid/Grid.js';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel.js';
import Checkbox from '@material-ui/core/Checkbox/Checkbox.js';
// import PersonIcon from '@material-ui/icons/Person';
// import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
// import EqualizerIcon from '@material-ui/icons/Equalizer';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler, CurrentTimeIndicator,
  MonthView, WeekView, DayView, ViewSwitcher,
  Appointments, AppointmentTooltip, AppointmentForm,
  DateNavigator, Resources,
  Toolbar, TodayButton, ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';
import locations from './Locations.jsx';
import hobbies from './Hobbies.jsx';
import prices from './Prices.jsx';

const GreenCheckbox = withStyles({
  root: {
    color: green[100],
    '&$checked': {
      color: green[200],
    },
    marginLeft: '15px',
  },
  checked: {},
})((props) => <Checkbox color='default' {...props} />);

const YellowCheckbox = withStyles({
  root: {
    color: yellow[400],
    '&$checked': {
      color: yellow[600],
    },
    marginLeft: '15px',
  },
  checked: {},
})((props) => <Checkbox color='default' {...props} />);

const BlueCheckbox = withStyles({
  root: {
    color: blue[100],
    '&$checked': {
      color: blue[200],
    },
    marginLeft: '15px',
  },
  checked: {},
})((props) => <Checkbox color='default' {...props} />);

const useStyles = makeStyles(() => ({
  calendar: {
    color: blue[600],
  },
  textCenter: {
    textAlign: 'center',
  },
  info: {
    marginTop: '8px',
  },
}));

export default function CustomCalendar(props) {
  const classes = useStyles();
  const storeName = props.store.name;
  const emailAddress = JSON.parse(localStorage.getItem('user.email'));
  const [storeCalendar, setStoreCalendar] = useState(props.calendar);
  const [calendar, setCalendar] = useState([]);
  const [resources, setResources] = useState([]);
  const [editorProps, setEditorProps] = useState([]);
  const [checked, setChecked] = useState({
    Booked: true,
    Available: true,
    Requested: true,
    Cancelled: false,
  });

  useEffect(() => {
    const toFilter = [];
    if (checked.Booked) toFilter.push(1);
    if (checked.Available) toFilter.push(0);
    if (checked.Requested) toFilter.push(-1);
    if (checked.Cancelled) toFilter.push(-2);

    setCalendar(Array.prototype.concat.apply([], ...[toFilter.map((b) => (
      storeCalendar.filter((c) => c.booked === b).map((e) => ({
        id: e.id,
        startDate: new Date(e.startDate),
        endDate: new Date(e.endDate),
        customerName: e.customerEmail,
        experience: e.experience,
        hobby: e.hobby,
        location: e.location,
        notes: e.notes,
        price: e.price,
        status: e.booked,
        title: e.guide,
      }))))]));

    setResources([
      {
        fieldName: 'status',
        title: 'Status',
        instances: [
          { id: -2, color: 'lightgrey', text: 'Cancelled' },
          { id: -1, color: blue[200], text: 'Requested' },
          { id: 0, color: yellow[600], text: 'Available' },
          { id: 1, color: green[200], text: 'Booked' },
        ],
      },
      {
        fieldName: 'hobby',
        title: 'Hobby',
        instances: hobbies,
      },
      {
        fieldName: 'location',
        title: 'Location',
        instances: locations,
      },
      {
        fieldName: 'customerName',
        title: 'Customer Name',
        instances: storeCalendar.map((c) => ({
          id: c.customerEmail,
          color: 'grey',
          text: c.customerEmail,
        })),
      },
      {
        fieldName: 'price',
        title: 'Price',
        instances: prices,
      },
      {
        fieldName: 'experience',
        title: 'Experience',
        instances: [
          { id: 'Beginner', color: 'grey', text: 'Beginner' },
          { id: 'Novice', color: 'grey', text: 'Novice' },
          { id: 'Advanced', color: 'grey', text: 'Advanced' },
          { id: 'Pro', color: 'grey', text: 'Pro' },
          { id: 'Expert', color: 'grey', text: 'Expert' },
        ],
      },
    ]);

    setEditorProps([
      {
        fieldName: 'customerName',
        title: 'Customer Name',
        instances: [],
      },
    ]);
  }, [checked, storeCalendar]);

  const updateCalendar = () => {
    axios.get('api/calendar', {
      params: {
        storeEmail: emailAddress,
      },
    })
      .then((res) => setStoreCalendar(res.data.store.calendar))
      .catch((err) => console.error(err.message));
  };

  const addEvent = (e) => {
    const id = Math.floor(Math.random() * Math.random() * 3939);
    axios.post('api/calendar/add', {
      params: {
        id,
        emailAddress,
        booked: JSON.stringify(e.status) || null,
        endDate: e.endDate || null,
        guide: e.title || null,
        startDate: e.startDate || null,
        location: e.location || null,
      },
    })
      .then(() => updateCalendar())
      .catch((err) => console.error(err.message));
  };

  const changeEvent = (e) => {
    const id = Object.keys(e)[0];
    axios.put('api/calendar/update', {
      params: {
        id,
        emailAddress,
        booked: JSON.stringify(e[id].status) || null,
        endDate: e[id].endDate || null,
        guide: e[id].title || null,
        startDate: e[id].startDate || null,
        location: e[id].location || null,
      },
    })
      .then(() => console.log('Changed successfully'))
      .catch((err) => console.error(err.message));
  };

  const cancelEvent = (id) => {
    axios.put('api/calendar/cancel', {
      params: { emailAddress, id },
    })
      .then(() => updateCalendar())
      .catch((err) => console.error(err.message));
  };

  const commitChanges = ({ added, changed, deleted }) => {
    if (added) {
      addEvent(added);
      const startingAddedId = calendar.length > 0 ? calendar[calendar.length - 1].id + 1 : 0;
      setCalendar([...calendar, { id: startingAddedId, ...added }]);
    }
    if (changed) {
      changeEvent(changed);
      setCalendar(calendar.map((appointment) => (
        changed[calendar.id] ? appointment : { ...appointment, ...changed[appointment.id] })));
    }
    if (deleted !== undefined) {
      cancelEvent(deleted);
      setCalendar(calendar.filter((appointment) => appointment.id !== deleted));
    }
  };

  const handleChange = (e) => {
    const attr = e.target.name;
    setChecked({ ...checked, [attr]: !checked[attr] });
  };

  return (
    <Container maxWidth='md' style={{ marginTop: '20' }}>
      <Paper elevation={2}> <h2 style={{ textAlign: 'center', paddingTop: '10px' }}>{storeName} Calendar</h2>
        <Paper elevation={1}>
          <Scheduler
            timeZone='America/Denver'
            height={600}
            data={calendar}
            defaultCurrentView='Numeric Mode'
            className={classes.calendar}
          >
            <ViewState defaultCurrentDate={Date()} />
            <MonthView />
            <WeekView startDayHour={6} endDayHour={20} />
            <DayView startDayHour={6} endDayHour={20} />
            <Toolbar />
            <DateNavigator />
            <TodayButton />
            <ViewSwitcher />
            <EditingState onCommitChanges={commitChanges} />
            <IntegratedEditing />
            <Appointments className={classes.calendar} showDeleteButton />
            <AppointmentTooltip
              showOpenButton
              showDeleteButton
              showCloseButton
              // contentComponent={Content}
            />
            <AppointmentForm
              TextEditorProps={editorProps}
              showDeleteButton
            />
            <ConfirmationDialog />
            <CurrentTimeIndicator shadePreviousAppointments shadePreviousCells />
            <Resources data={resources} />
          </Scheduler>
        </Paper>
        <Grid
          container
          direction='row'
          justify='flex-start'
          alignItems='center'
        >
          <FormControlLabel
            control={(
              <GreenCheckbox
                checked={checked.Booked}
                onChange={handleChange}
                name='Booked'
              />
            )}
            label='Show Booked'
          />
          <FormControlLabel
            control={(
              <YellowCheckbox
                checked={checked.Available}
                onChange={handleChange}
                name='Available'
              />
            )}
            label='Show Available'
          />
          <FormControlLabel
            control={(
              <BlueCheckbox
                checked={checked.Requested}
                onChange={handleChange}
                name='Requested'
              />
            )}
            label='Show Customer Requests'
          />
          <FormControlLabel
            control={(
              <Checkbox
                checked={checked.Cancelled}
                onChange={handleChange}
                name='Cancelled'
                color='default'
              />
            )}
            label='Show Cancellations'
          />
        </Grid>
      </Paper>
    </Container>
  );
}

// some weird icon stuff for info

// eslint-disable-next-line react/destructuring-assignment
// const Content = ({ children, appointmentData, ...restProps }) => (
//   <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
//     <Grid container alignItems='center' className={classes.info}>
//       <Grid item xs={2} className={classes.textCenter}>
//         <PersonIcon />
//       </Grid>
//       <Grid item xs={10}>
//         {appointmentData.customerName}
//       </Grid>
//       <Grid item xs={2} className={classes.textCenter}>
//         <AttachMoneyIcon />
//       </Grid>
//       <Grid item xs={10}>
//         ${appointmentData.price}
//       </Grid>
//       <Grid item xs={2} className={classes.textCenter}>
//         <EqualizerIcon />
//       </Grid>
//       <Grid item xs={10}>
//         {appointmentData.experience}
//       </Grid>
//     </Grid>
//   </AppointmentTooltip.Content>
// );
