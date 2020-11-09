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
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var _material_ui_core_Paper_Paper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Paper/Paper.js */ \"./node_modules/@material-ui/core/Paper/Paper.js\");\n/* harmony import */ var _devexpress_dx_react_scheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @devexpress/dx-react-scheduler */ \"./node_modules/@devexpress/dx-react-scheduler/dist/dx-react-scheduler.es.js\");\n/* harmony import */ var _devexpress_dx_react_scheduler_material_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @devexpress/dx-react-scheduler-material-ui */ \"./node_modules/@devexpress/dx-react-scheduler-material-ui/dist/dx-react-scheduler-material-ui.es.js\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { if (typeof Symbol === \"undefined\" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n/* eslint-disable import/prefer-default-export */\n\n\n\n\n\nvar CustomerCalendar = function CustomerCalendar(props) {\n  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(props.calendar),\n      _useState2 = _slicedToArray(_useState, 1),\n      store = _useState2[0];\n\n  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),\n      _useState4 = _slicedToArray(_useState3, 2),\n      calendar = _useState4[0],\n      setCalendar = _useState4[1];\n\n  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),\n      _useState6 = _slicedToArray(_useState5, 2),\n      resources = _useState6[0],\n      setResources = _useState6[1];\n\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {\n    setCalendar(calendar.concat(store.forEach(function (event) {\n      return {\n        id: event.id,\n        startDate: new Date(event.datetimeStart),\n        endDate: new Date(event.datetimeEnd),\n        title: event.guide,\n        price: event.price,\n        status: event.booked,\n        customerName: event.customerName,\n        experience: event.experience,\n        notes: event.notes\n      };\n    })));\n    setResources([{\n      fieldName: 'status',\n      title: 'Status',\n      instances: [{\n        id: true,\n        color: 'lightgreen',\n        text: 'Booked'\n      }, {\n        id: false,\n        colorRGB: '245,181,108',\n        text: 'Available'\n      }]\n    } // {\n    //   fieldName: 'customerName',\n    //   title: 'Customer Name',\n    //   allowMultiple: true,\n    //   instances: [calendar.forEach((i) => ({ id: i.customerName, text: i.customerName }))],\n    // },\n    // {\n    //   fieldName: 'price',\n    //   title: 'Price',\n    //   instances: [\n    //     { id: schedulerData.price, text: schedulerData.price },\n    //   ],\n    // },\n    ]);\n  }, [1]);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_material_ui_core_Paper_Paper_js__WEBPACK_IMPORTED_MODULE_3__.default, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_devexpress_dx_react_scheduler_material_ui__WEBPACK_IMPORTED_MODULE_2__.Scheduler, {\n    data: calendar\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_devexpress_dx_react_scheduler__WEBPACK_IMPORTED_MODULE_1__.ViewState, {\n    defaultCurrentDate: Date()\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_devexpress_dx_react_scheduler_material_ui__WEBPACK_IMPORTED_MODULE_2__.MonthView, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_devexpress_dx_react_scheduler_material_ui__WEBPACK_IMPORTED_MODULE_2__.WeekView, {\n    startDayHour: 6,\n    endDayHour: 20\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_devexpress_dx_react_scheduler_material_ui__WEBPACK_IMPORTED_MODULE_2__.DayView, {\n    startDayHour: 6,\n    endDayHour: 20\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_devexpress_dx_react_scheduler_material_ui__WEBPACK_IMPORTED_MODULE_2__.Toolbar, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_devexpress_dx_react_scheduler_material_ui__WEBPACK_IMPORTED_MODULE_2__.DateNavigator, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_devexpress_dx_react_scheduler_material_ui__WEBPACK_IMPORTED_MODULE_2__.TodayButton, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_devexpress_dx_react_scheduler_material_ui__WEBPACK_IMPORTED_MODULE_2__.ViewSwitcher, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_devexpress_dx_react_scheduler_material_ui__WEBPACK_IMPORTED_MODULE_2__.Appointments, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_devexpress_dx_react_scheduler_material_ui__WEBPACK_IMPORTED_MODULE_2__.AppointmentTooltip, {\n    showOpenButton: true,\n    showDeleteButton: true\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_devexpress_dx_react_scheduler_material_ui__WEBPACK_IMPORTED_MODULE_2__.AppointmentForm, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_devexpress_dx_react_scheduler_material_ui__WEBPACK_IMPORTED_MODULE_2__.CurrentTimeIndicator, {\n    shadePreviousAppointments: true,\n    shadePreviousCells: true\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_devexpress_dx_react_scheduler_material_ui__WEBPACK_IMPORTED_MODULE_2__.Resources, {\n    data: resources\n  }))));\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomerCalendar); // const storeId = Math.floor(Math.random() * 100 + 1);\n//   const schedulerData = [];\n//   axios.get('api/calendar', {\n//     params: {\n//       storeId,\n//     },\n//   })\n//     .then((res) => {\n//       res.data.store.calendar.forEach((event) => {\n//         // console.log(event);\n//         schedulerData.push(\n//           {\n//             id: event.id,\n//             startDate: new Date(event.datetimeStart),\n//             endDate: new Date(event.datetimeEnd),\n//             title: event.guide,\n//             price: event.price,\n//             status: event.booked,\n//             customerName: event.customerName,\n//             experience: event.experience,\n//             notes: event.notes,\n//           },\n//         );\n//       });\n//       // console.log(schedulerData);\n//     })\n//     .catch((err) => console.error(err.message));\n//   // const customerData = [\n//   //   { startDate: '2020-11-22T18:35:02', endDate: '2020-11-22T20:00:02', title: 'Meeting' },\n//   //   { startDate: '2020-11-01T12:00', endDate: '2020-11-01T13:30', title: 'Go to a gym' },\n//   // ];\n//   const resources = [\n//     {\n//       fieldName: 'status',\n//       title: 'Status',\n//       instances: [\n//         { id: true, color: 'lightgreen', text: 'Booked' },\n//         { id: false, colorRGB: '245,181,108', text: 'Available' },\n//       ],\n//     },\n//     {\n//       fieldName: 'customerName',\n//       title: 'Customer Name',\n//       allowMultiple: true,\n//       instances: [schedulerData.forEach((i) => ({ id: i.customerName, text: i.customerName }))],\n//     },\n//     // {\n//     //   fieldName: 'price',\n//     //   title: 'Price',\n//     //   instances: [\n//     //     { id: schedulerData.price, text: schedulerData.price },\n//     //   ],\n//     // },\n//   ];\n//   return (\n//     <div>\n//       <Paper>\n//         <Scheduler data={schedulerData}>\n//           <ViewState\n//             defaultCurrentDate={Date()}\n//           />\n//           <MonthView />\n//           <WeekView startDayHour={6} endDayHour={20} />\n//           <DayView startDayHour={6} endDayHour={20} />\n//           <Toolbar />\n//           <DateNavigator />\n//           <TodayButton />\n//           <ViewSwitcher />\n//           <Appointments />\n//           <AppointmentTooltip showOpenButton showDeleteButton />\n//           <AppointmentForm />\n//           <CurrentTimeIndicator shadePreviousAppointments shadePreviousCells />\n//           <Resources data={resources} />\n//         </Scheduler>\n//       </Paper>\n//     </div>\n//   );\n// };\n\n//# sourceURL=webpack://advenew-v1/./client/src/Components/CustomCalendar.jsx?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "c3d7bdce46b0f1873b29"
/******/ 	})();
/******/ 	
/******/ }
);