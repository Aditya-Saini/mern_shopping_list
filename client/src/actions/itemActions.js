import {GET_ITEMS, ADD_ITEM, DELETE_ITEM} from './types';

export const getItems = ()=> {
    return{
        type: GET_ITEMS
    };
};

export const getItems = (id)=> {
    return{
        type: DELETE_ITEMS
    };
}