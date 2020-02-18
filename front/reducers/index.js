import { combineReducers } from 'redux';
import user from './user';
import post from './post';

const rootReducer = combineReducers({
  user,
  post,
});

export default rootReducer;


// user reducer + post reducer => root reducer 로 합침.