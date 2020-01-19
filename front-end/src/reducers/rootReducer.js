import projectReducer from './projectReducer';
import { combineReducers } from 'redux'
import chartReducer from './chartReducer';

const rootReducer = combineReducers({
  project: projectReducer,
  myAP: chartReducer
})

export default rootReducer;
