import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import * as roomReducers from './room';
import * as scheduleReducers from './schedule';
import * as courseReducers from './course';
import * as teacherReducers from './teacher';
import * as studentReducers from './student';
import * as adminReducers from './admin';

const rootReducer = combineReducers({
  routing,
  ...roomReducers,
  ...scheduleReducers,
  ...courseReducers,
  ...teacherReducers,
  ...studentReducers,
  ...adminReducers,
});

export default rootReducer;
