/* eslint-disable import/extensions */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/prefer-default-export */
import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
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

const GreenCheckbox = withStyles({
  root: {
    color: green[200],
    '&$checked': {
      color: green[400],
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
    color: blue[200],
    '&$checked': {
      color: blue[400],
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

export default function CustomerCalendar(props) {
  const classes = useStyles();
  const [storeCalendar] = useState(props.calendar);
  const [bookedCalendar, setBookedCalendar] = useState([]);
  const [availableCalendar, setAvailableCalendar] = useState([]);
  const [requestedCalendar, setRequestedCalendar] = useState([]);
  const [cancelledCalendar, setCancelledCalendar] = useState([]);
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
    if (checked.Booked) {
      setBookedCalendar(storeCalendar.filter((c) => c.booked === 1).map((e) => ({
        id: e.id,
        startDate: new Date(e.startDate),
        endDate: new Date(e.endDate),
        title: e.guide,
        price: e.price,
        status: e.booked,
        customerName: e.customerName,
        experience: e.experience,
        notes: e.notes,
      })));
    } else setBookedCalendar([]);
    if (checked.Available) {
      setAvailableCalendar(storeCalendar.filter((c) => c.booked === 0).map((e) => ({
        id: e.id,
        startDate: new Date(e.startDate),
        endDate: new Date(e.endDate),
        title: e.guide,
        price: e.price,
        status: e.booked,
        customerName: e.customerName,
        experience: e.experience,
        notes: e.notes,
      })));
    } else setAvailableCalendar([]);
    if (checked.Requested) {
      setRequestedCalendar(storeCalendar.filter((c) => c.booked === -1).map((e) => ({
        id: e.id,
        startDate: new Date(e.startDate),
        endDate: new Date(e.endDate),
        title: e.guide,
        price: e.price,
        status: e.booked,
        customerName: e.customerName,
        experience: e.experience,
        notes: e.notes,
      })));
    } else setRequestedCalendar([]);
    if (checked.Cancelled) {
      setCancelledCalendar(storeCalendar.filter((c) => c.booked === -2).map((e) => ({
        id: e.id,
        startDate: new Date(e.startDate),
        endDate: new Date(e.endDate),
        title: e.guide,
        price: e.price,
        status: e.booked,
        customerName: e.customerName,
        experience: e.experience,
        notes: e.notes,
      })));
    } else setCancelledCalendar([]);

    setResources([
      {
        fieldName: 'status',
        title: 'Status',
        instances: [
          { id: -2, color: 'grey', text: 'Cancelled' },
          { id: -1, color: 'lightblue', text: 'Requested' },
          { id: 0, color: 'f8de7e', text: 'Available' },
          { id: 1, color: 'lightgreen', text: 'Booked' },
        ],
      },
      {
        fieldName: 'customerName',
        title: 'Customer Name',
        instances: storeCalendar.map((c) => ({
          id: c.customerName,
          color: 'grey',
          text: c.customerName,
        })),
      },
      {
        fieldName: 'price',
        title: 'Price',
        instances: storeCalendar.map((c) => ({
          id: c.price,
          color: 'grey',
          text: '$'.concat(c.price),
        })),
      },
      {
        fieldName: 'experience',
        title: 'Experience',
        instances: storeCalendar.map((c) => ({
          id: c.experience,
          color: 'grey',
          text: c.experience,
        })),
      },
    ]);

    setEditorProps([
      {
        fieldName: 'customerName',
        title: 'Customer Name',
        instances: [],
      },
    ]);
  }, [checked]);

  const commitChanges = ({ added, changed, deleted }) => {
    if (added) {
      const startingAddedId = calendar.length > 0 ? calendar[calendar.length - 1].id + 1 : 0;
      setCalendar([...calendar, { id: startingAddedId, ...added }]);
    }
    if (changed) {
      setCalendar(calendar.map((appointment) => (
        changed[calendar.id] ? appointment : { ...appointment, ...changed[appointment.id] })));
    }
    if (deleted !== undefined) {
      setCalendar(calendar.filter((appointment) => appointment.id !== deleted));
    }
  };

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

  const handleChange = (e) => {
    const attr = e.target.name;
    setChecked({ ...checked, [attr]: !checked[attr] });
  };

  return (
    <Container maxWidth='md' style={{ marginTop: '20' }}>
      <Paper elevation={2}>
        <Paper elevation={1}>
          <Scheduler
            data={bookedCalendar.concat(availableCalendar.concat(requestedCalendar.concat(cancelledCalendar)))}
            defaultCurrentView='Numeric Mode'
            className={classes.calendar}
          >
            <ViewState
              defaultCurrentDate={Date()}
            />
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
              />
            )}
            label='Show Cancellations'
          />
        </Grid>
      </Paper>
    </Container>
  );
}

// export default CustomerCalendar;
