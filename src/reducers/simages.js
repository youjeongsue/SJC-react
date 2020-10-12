import _ from 'lodash';
import {
    GET_SIMAGES,
    GET_SIMAGE,
    ADD_SIMAGE,
    DELETE_SIMAGE,
    EDIT_SIMAGE
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type){
        case GET_SIMAGES:
            return {
                ..._.mapKeys(action.payload, 'id')
            };
        case GET_SIMAGE:
        case ADD_SIMAGE:
        case EDIT_SIMAGE:
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        case DELETE_SIMAGE:
            return _.omit(state, action.payload);
        default:
            return state;
    }
};