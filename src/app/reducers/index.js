import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import * as systemReducers from './system';
import * as roomReducers from './room';
import * as scheduleReducers from './schedule';
import * as courseReducers from './course';
import * as teacherReducers from './teacher';
import * as studentReducers from './student';
import * as adminReducers from './admin';
import * as productReducers from './product';

const rootReducer = combineReducers({
  routing,
  ...systemReducers,
  ...roomReducers,
  ...scheduleReducers,
  ...courseReducers,
  ...teacherReducers,
  ...studentReducers,
  ...adminReducers,
  ...productReducers,
});

export default rootReducer;
