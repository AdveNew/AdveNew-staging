/* eslint-disable import/prefer-default-export */
import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper/Paper.js';
import Container from '@material-ui/core/Container/Container.js';
import Grid from '@material-ui/core/Grid/Grid.js';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel.js';
import Checkbox from '@material-ui/core/Checkbox/Checkbox.js';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler, CurrentTimeIndicator,
  MonthView, WeekView, DayView, ViewSwitcher,
  Appointments, AppointmentTooltip, AppointmentForm,
  DateNavigator, Resources,
  Toolbar, TodayButton, ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';

export default function CustomerCalendar(props) {
  const [store] = useState(props.calendar);
  const [calendar, setCalendar] = useState([]);
  const [resources, setResources] = useState([]);
  const [editorProps, setEditorProps] = useState([]);
  const [checked, setChecked] = useState({
    Booked: true,
    Available: false,
  });

  useEffect(() => {
    setCalendar(store.map((event) => ({
      id: event.id,
      startDate: new Date(event.startDate),
      endDate: new Date(event.endDate),
      title: event.guide,
      price: event.price,
      status: event.booked,
      customerName: event.customerName,
      experience: event.experience,
      notes: event.notes,
    })));

    setResources([
      {
        fieldName: 'status',
        title: 'Status',
        instances: [
          { id: true, color: 'lightgreen', text: 'Booked' },
          { id: false, color: 'gold', text: 'Available' },
        ],
      },
      // {
      //   fieldName: 'customerName',
      //   title: 'Customer Name',
      //   instances: calendar,
      // },
    ]);

    setEditorProps([
      {
        placeholder: 'Customer Name',
        type: 'Name',
        value: 'TEST',
      },
    ]);
  }, [1]);

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

  const views = [{
    type: 'Month',
    name: 'Numeric Mode',
    maxAppointmentsPerCell: 2,
  }];

  const handleChange = (e) => {
    const attr = e.target.name;
    setChecked({ ...checked, [attr]: !checked[attr] });
  };

  return (
    <Container maxWidth='md'>
      <Paper elevation={5} className='calendar'>
        <Paper elevation={1} className='calendar'>
          <Scheduler
            data={calendar}
            views={views}
            defaultCurrentView='Numeric Mode'
            className='scheduler'
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
            <Appointments className='appointments' showDeleteButton />
            <AppointmentTooltip
              showOpenButton
              showDeleteButton
              showCloseButton
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
              <Checkbox
                checked={checked.Booked}
                onChange={handleChange}
                name='Booked'
                color='primary'
              />
            )}
            label='Show Booked'
          />
          <FormControlLabel
            control={(
              <Checkbox
                checked={checked.Available}
                onChange={handleChange}
                name='Available'
                color='primary'
              />
            )}
            label='Show Available'
          />
        </Grid>
      </Paper>
    </Container>
  );
}

// export default CustomerCalendar;
