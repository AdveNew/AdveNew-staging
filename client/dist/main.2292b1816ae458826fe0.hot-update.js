/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdateadvenew_v1"]("main",{

/***/ "./client/src/Components/CustomCalendar.jsx":
/*!**************************************************!*\
  !*** ./client/src/Components/CustomCalendar.jsx ***!
  \**************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _material_ui_core_Paper_Paper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Paper/Paper.js */ \"./node_modules/@material-ui/core/Paper/Paper.js\");\n/* harmony import */ var _devexpress_dx_react_scheduler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @devexpress/dx-react-scheduler */ \"./node_modules/@devexpress/dx-react-scheduler/dist/dx-react-scheduler.es.js\");\n/* harmony import */ var _devexpress_dx_react_scheduler_material_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @devexpress/dx-react-scheduler-material-ui */ \"./node_modules/@devexpress/dx-react-scheduler-material-ui/dist/dx-react-scheduler-material-ui.es.js\");\n;\n\n\n\n\nvar storeId = Math.floor(Math.random() * 100 + 1);\nvar schedulerData = [];\naxios__WEBPACK_IMPORTED_MODULE_1___default().get('api/calendar', {\n  params: {\n    storeId: storeId\n  }\n}).then(function (res) {\n  res.data.store.calendar.forEach(function (event) {\n    // console.log(event);\n    schedulerData.push({\n      id: event.id,\n      startDate: event.datetimeStart,\n      endDate: event.datetimeEnd,\n      title: event.guide,\n      price: event.price,\n      status: event.booked,\n      customerName: event.customerName,\n      experience: event.experience,\n      notes: event.notes\n    });\n  });\n  console.log(schedulerData);\n})[\"catch\"](function (err) {\n  return console.error(err.message);\n}); // const customerData = [\n//   { startDate: '2020-11-22T18:35:02', endDate: '2020-11-22T20:00:02', title: 'Meeting' },\n//   { startDate: '2020-11-01T12:00', endDate: '2020-11-01T13:30', title: 'Go to a gym' },\n// ];\n\nvar resources = [{\n  fieldName: 'status',\n  title: 'Status',\n  instances: [{\n    id: true,\n    color: 'lightgreen',\n    text: 'Booked'\n  }, {\n    id: false,\n    colorRGB: '245,181,108',\n    text: 'Available'\n  }]\n}, {\n  fieldName: 'customerName',\n  title: 'Customer Name',\n  instances: schedulerData.id\n} // {\n//   fieldName: 'price',\n//   title: 'Price',\n//   instances: [\n//     { id: schedulerData.price, text: schedulerData.price },\n//   ],\n// },\n];\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function () {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Paper_Paper_js__WEBPACK_IMPORTED_MODULE_4__.default, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_devexpress_dx_react_scheduler_material_ui__WEBPACK_IMPORTED_MODULE_3__.Scheduler, {\n    data: schedulerData\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_devexpress_dx_react_scheduler__WEBPACK_IMPORTED_MODULE_2__.ViewState, {\n    defaultCurrentDate: Date()\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_devexpress_dx_react_scheduler_material_ui__WEBPACK_IMPORTED_MODULE_3__.MonthView, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_devexpress_dx_react_scheduler_material_ui__WEBPACK_IMPORTED_MODULE_3__.WeekView, {\n    startDayHour: 6,\n    endDayHour: 20\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_devexpress_dx_react_scheduler_material_ui__WEBPACK_IMPORTED_MODULE_3__.DayView, {\n    startDayHour: 6,\n    endDayHour: 20\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_devexpress_dx_react_scheduler_material_ui__WEBPACK_IMPORTED_MODULE_3__.Toolbar, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_devexpress_dx_react_scheduler_material_ui__WEBPACK_IMPORTED_MODULE_3__.DateNavigator, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_devexpress_dx_react_scheduler_material_ui__WEBPACK_IMPORTED_MODULE_3__.TodayButton, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_devexpress_dx_react_scheduler_material_ui__WEBPACK_IMPORTED_MODULE_3__.ViewSwitcher, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_devexpress_dx_react_scheduler_material_ui__WEBPACK_IMPORTED_MODULE_3__.Appointments, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_devexpress_dx_react_scheduler_material_ui__WEBPACK_IMPORTED_MODULE_3__.AppointmentTooltip, {\n    showOpenButton: true,\n    showDeleteButton: true\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_devexpress_dx_react_scheduler_material_ui__WEBPACK_IMPORTED_MODULE_3__.AppointmentForm, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_devexpress_dx_react_scheduler_material_ui__WEBPACK_IMPORTED_MODULE_3__.Resources, {\n    data: resources\n  })));\n});\n\n//# sourceURL=webpack://advenew-v1/./client/src/Components/CustomCalendar.jsx?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "effabd6930af8a69c8f9"
/******/ 	})();
/******/ 	
/******/ }
);