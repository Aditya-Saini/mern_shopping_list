//meeting place for all the reducers
import {combineReducers} from 'redux';
import itemReducer from './itemReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
    item: itemReducer
});