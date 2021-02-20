## REACT FRONT END
The front end framework is built on ReactJS. All components should be added to the src/Components folder. 

#### Bundle data
 Refer to [main README](../README.md) for how to create the bundle.js file.

### Helpful Resources (Used in Components):
1. [Material UI](https://material-ui.com/)
  1. [Icons](https://material-ui.com/components/material-icons/)
  2. [Picker](https://material-ui-pickers.dev/) - Removed this for now, had some issues with compatibility 
    - Install the picker with: `npm i @material-ui/pickers`
    - If using picker, you'll need to:
      1. Add a date utility `npm i @date-io/date-fns@1.3.13 date-fns`
      2. Add `import DateFnsUtils from '@date-io/date-fns';` to component, and 
      3. Wrap date feature in `<MuiPickersUtilsProvider utils={DateFnsUtils}> ... </MuiPickersUtilsProvider>`

#### Calendar Resources (For current calendar)
  1. [React](https://reactjs.org/)
  2. [React Hooks](https://reactjs.org/docs/hooks-intro.html)
  3. [Material UI](https://material-ui.com/)
  4. [Calendar Overview](https://js.devexpress.com/Documentation/Guide/Widgets/Calendar/Overview/)
  5. [Calendar Widget](https://js.devexpress.com/Demos/WidgetsGallery/Demo/Calendar/Overview/React/Light/)
  6. [React Scheduler Reference](https://devexpress.github.io/devextreme-reactive/react/scheduler/docs/reference/scheduler/)
    - [subref #1](https://js.devexpress.com/Documentation/Guide/Widgets/Scheduler/Appointments/Customize_Appointment_Tooltip/)
    - [subref #2](https://js.devexpress.com/Demos/WidgetsGallery/Demo/Scheduler/LimitAppointmentCountPerCell/React/Dark/)

  ##### Some calendar alternatives: 
  1. [Instructure small widget-like calendar](https://instructure.design/#Calendar) - as seen on Canvas 
  2. [syncfusion](https://www.syncfusion.com/react-ui-components/react-scheduler) - 2/5
  3. [kendo](https://www.telerik.com/kendo-react-ui/components/scheduler/) - 3/5
  4. [a less pretty one by some dude](https://stephenchou1017.github.io/scheduler/#/) - 1/5
  5. [DHTMLX](https://dhtmlx.com/blog/use-dhtmlx-scheduler-component-react-js-library-demo/) 4/5
  6. [Toast UI](https://ui.toast.com/tui-calendar) - 4/5
  7. [FullCalendar](https://fullcalendar.io/) - 3.5/5
  8. [BigCalendar](https://jquense.github.io/react-big-calendar/examples/index.html) - 3.5/5
  9. [some nonsense scheduler to look at](https://demo.easyappointments.org/) - ?
  10. [Nylas](https://www.nylas.com/products/calendar-sync/) - 4/5
  11. [Amelia](https://wpamelia.com/) - ?
  12. [vcalendar](https://vcalendar.io/i18n.html) - ? - used on canvas
  13. [Semantic UI Calendar](https://www.npmjs.com/package/semantic-ui-calendar-react) [Demo](https://codepen.io/nijin39/pen/JbQBXM)
