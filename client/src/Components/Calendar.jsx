import React from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
// import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';

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
        },
      );
      console.log(schedulerData);
    });
  })
  .catch((err) => console.error(err.message));
// const customerData = [
//   { startDate: '2020-11-22T18:35:02.000Z', endDate: '2020-11-22T20:00:02.000Z', title: 'Meeting' },
//   { startDate: '2020-11-01T12:00', endDate: '2020-11-01T13:30', title: 'Go to a gym' },
// ];

console.log(schedulerData);

export default () => (
  <Paper>
    <Scheduler
      data={schedulerData}
    >
      <MonthView />
      <Appointments />
    </Scheduler>
  </Paper>
);
