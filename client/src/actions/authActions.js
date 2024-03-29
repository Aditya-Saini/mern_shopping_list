import axios from 'axios';
import { returnErrors } from './errorActions';

import { 
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL 
} from './types';

//check token and load user
export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING });


    //fetch the user
    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            })
        });
}

// Register User
export const register = ({ name, email, password }) => dispatch => {
    //headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request body
    const body = JSON.stringify({ name, email, password });

    axios.post('/api/users', body, config)
        .then(res => dispatch({  //IF data is successfully sent over to server
            type: REGISTER_SUCCESS,
            payload: res.data
         }))
         .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
             dispatch({ //if there is some kind of error
                 type: REGISTER_FAIL
             });
         });
};

// Login User
export const login = ({ email, password }) => dispatch => {
    //headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request body
    const body = JSON.stringify({ email, password });

    axios.post('/api/auth', body, config)
        .then(res => dispatch({  //IF data is successfully sent over to server
            type: LOGIN_SUCCESS,
            payload: res.data
         }))
         .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
             dispatch({ //if there is some kind of error
                 type: LOGIN_FAIL
             });
         });
};

// Logout User
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}


//Setup config/headers and token
export const tokenConfig = getState => {
    // Get token from local storage
    const token = getState().auth.token;

    //headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // If token, add to headers
    if(token) {
        config.headers['x-auth-token'] = token;
    }

    return config
}