import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
//import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

const initialState = {}; //representing our initial state.

const middleware = [thunk]; // variable for all the middleware.

const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));//store variable createstore function takes 3 things rootreducer, initialstate and middleware since we are using redux tools we will be wrapping it in compose.

export default store;