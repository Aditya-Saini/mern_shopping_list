//meeting place for all the reducers
import {combineReducers} from 'redux';
import itemReducer from './itemReducer';

export default combineReducers({
    item: itemReducer
});