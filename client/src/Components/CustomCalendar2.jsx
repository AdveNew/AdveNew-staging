/* eslint-disable import/prefer-default-export */
import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper/Paper.js';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler, CurrentTimeIndicator,
  MonthView, WeekView, DayView, ViewSwitcher,
  Appointments, AppointmentTooltip, AppointmentForm,
  DateNavigator, Resources,
  Toolbar, TodayButton, ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';

const CustomerCalendar2 = (props) => {
  const [store] = useState(props.calendar);
  const [calendar, setCalendar] = useState([]);
  const [resources, setResources] = useState([]);
  const [editorProps, setEditorProps] = useState([]);

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
          { id: false, colorRGB: '245,181,108', text: 'Available' },
        ],
      },
      {
        fieldName: 'customerName',
        title: 'Customer Name',
        instances: calendar,
      },
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
    type: 'month',
    name: 'Auto Mode',
    maxAppointmentsPerCell: 2,
  }, {
    type: 'month',
    name: 'Unlimited Mode',
    maxAppointmentsPerCell: 2,
  }, {
    type: 'month',
    name: 'Numeric Mode',
    maxAppointmentsPerCell: 2,
  }];

  return (
    <div>
      <Paper className='paper'>
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
    </div>
  );
};

export default CustomerCalendar2;
