/* eslint-disable import/prefer-default-export */
import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper/Paper.js';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler, CurrentTimeIndicator,
  MonthView, WeekView, DayView, ViewSwitcher,
  Appointments, AppointmentTooltip, AppointmentForm,
  DateNavigator, Resources,
  Toolbar, TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';

const CustomerCalendar = (props) => {
  const [store] = useState(props.calendar);
  const [calendar, setCalendar] = useState([]);
  const [resources, setResources] = useState([]);

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
        allowMultiple: true,
        instances: [calendar.map((i) => ({ text: i.customerName }))],
      },
      // {
      //   fieldName: 'price',
      //   title: 'Price',
      //   instances: [
      //     { id: schedulerData.price, text: schedulerData.price },
      //   ],
      // },
    ]);
  }, [1]);

  return (
    <div>
      <Paper>
        <Scheduler data={calendar}>
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
          <Appointments />
          <AppointmentTooltip showOpenButton showDeleteButton />
          <AppointmentForm />
          <CurrentTimeIndicator shadePreviousAppointments shadePreviousCells />
          <Resources data={resources} />
        </Scheduler>
      </Paper>
    </div>
  );
};

export default CustomerCalendar;

// const storeId = Math.floor(Math.random() * 100 + 1);
//   const schedulerData = [];
//   axios.get('api/calendar', {
//     params: {
//       storeId,
//     },
//   })
//     .then((res) => {
//       res.data.store.calendar.forEach((event) => {
//         // console.log(event);
//         schedulerData.push(
//           {
//             id: event.id,
//             startDate: new Date(event.datetimeStart),
//             endDate: new Date(event.datetimeEnd),
//             title: event.guide,
//             price: event.price,
//             status: event.booked,
//             customerName: event.customerName,
//             experience: event.experience,
//             notes: event.notes,
//           },
//         );
//       });
//       // console.log(schedulerData);
//     })
//     .catch((err) => console.error(err.message));
//   // const customerData = [
//   //   { startDate: '2020-11-22T18:35:02', endDate: '2020-11-22T20:00:02', title: 'Meeting' },
//   //   { startDate: '2020-11-01T12:00', endDate: '2020-11-01T13:30', title: 'Go to a gym' },
//   // ];

//   const resources = [
//     {
//       fieldName: 'status',
//       title: 'Status',
//       instances: [
//         { id: true, color: 'lightgreen', text: 'Booked' },
//         { id: false, colorRGB: '245,181,108', text: 'Available' },
//       ],
//     },
//     {
//       fieldName: 'customerName',
//       title: 'Customer Name',
//       allowMultiple: true,
//       instances: [schedulerData.forEach((i) => ({ id: i.customerName, text: i.customerName }))],
//     },
//     // {
//     //   fieldName: 'price',
//     //   title: 'Price',
//     //   instances: [
//     //     { id: schedulerData.price, text: schedulerData.price },
//     //   ],
//     // },
//   ];

//   return (
//     <div>
//       <Paper>
//         <Scheduler data={schedulerData}>
//           <ViewState
//             defaultCurrentDate={Date()}
//           />
//           <MonthView />
//           <WeekView startDayHour={6} endDayHour={20} />
//           <DayView startDayHour={6} endDayHour={20} />
//           <Toolbar />
//           <DateNavigator />
//           <TodayButton />
//           <ViewSwitcher />
//           <Appointments />
//           <AppointmentTooltip showOpenButton showDeleteButton />
//           <AppointmentForm />
//           <CurrentTimeIndicator shadePreviousAppointments shadePreviousCells />
//           <Resources data={resources} />
//         </Scheduler>
//       </Paper>
//     </div>
//   );
// };
