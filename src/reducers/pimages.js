import _ from 'lodash';
import {
    GET_PIMAGES,
    GET_PIMAGE,
    ADD_PIMAGE,
    DELETE_PIMAGE,
    EDIT_PIMAGE
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type){
        case GET_PIMAGES:
            return {
                ..._.mapKeys(action.payload, 'id')
            };
        case GET_PIMAGE:
        case ADD_PIMAGE:
        case EDIT_PIMAGE:
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        case DELETE_PIMAGE:
            return _.omit(state, action.payload);
        default:
            return state;
    }
};