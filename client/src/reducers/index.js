//meeting place for all the reducers
import {combineReducers} from 'redux';
import itemReducer from './itemReducer';
import itemReducer from './errorReducer';
import itemReducer from './authReducer';

export default combineReducers({
    item: itemReducer
});