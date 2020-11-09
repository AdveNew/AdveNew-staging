import React from 'react';
import axios from 'axios';
import makeStyles from '@material-ui/core/styles/makeStyles.js';
import Paper from '@material-ui/core/Paper/Paper.js';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView, WeekView, DayView, ViewSwitcher,
  Appointments, AppointmentTooltip, AppointmentForm,
  DateNavigator,
  Toolbar, TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';

const useStyles = makeStyles({
  events: {
    color: 'green',
  },
});

const storeId = Math.floor(Math.random() * 100 + 1);
const schedulerData = [];
axios.get('api/calendar', {
  params: {
    storeId,
  },
})
  .then((res) => {
    res.data.store.calendar.forEach((event) => {
      // console.log(event);
      schedulerData.push(
        {
          startDate: event.datetimeStart,
          endDate: event.datetimeEnd,
          title: event.guide,
          notes: event.notes,
          customer: event.customerName,
          booked: event.booked,
          id: event.experience,
        },
      );
    });
  })
  .catch((err) => console.error(err.message));
// const customerData = [
//   { startDate: '2020-11-22T18:35:02', endDate: '2020-11-22T20:00:02', title: 'Meeting' },
//   { startDate: '2020-11-01T12:00', endDate: '2020-11-01T13:30', title: 'Go to a gym' },
// ];

export default () => (
  <Paper>
    <Scheduler data={schedulerData}>
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
      <Appointments className={useStyles().events} />
      <AppointmentTooltip showOpenButton showDeleteButton />
      <AppointmentForm />
    </Scheduler>
  </Paper>
);
