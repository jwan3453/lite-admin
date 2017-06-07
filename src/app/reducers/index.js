import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import * as systemReducers from './system';
import * as roomReducers from './room';
import * as scheduleReducers from './schedule';
import * as courseReducers from './course';
import * as teacherReducers from './teacher';
import * as teacherAppointmentReducers from './teacherAppointment';
import * as studentReducers from './student';
import * as studentAppointmentReducers from './studentAppointment';
import * as studentProductReducers from './studentProduct';
import * as adminReducers from './admin';
import * as productReducers from './product';

const rootReducer = combineReducers({
  routing,
  ...systemReducers,
  ...roomReducers,
  ...scheduleReducers,
  ...courseReducers,
  ...teacherReducers,
  ...teacherAppointmentReducers,
  ...studentReducers,
  ...studentAppointmentReducers,
  ...studentProductReducers,
  ...adminReducers,
  ...productReducers,
});

export default rootReducer;
