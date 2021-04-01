import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import register from './register/reducer';

const reducers = combineReducers({
  menu,
  settings,
  register,
});

export default reducers;
