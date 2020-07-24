import _ from 'lodash';
import {
    GET_ASSIGNMENTS,
    GET_ASSIGNMENT,
    ADD_ASSIGNMENT,
    DELETE_ASSIGNMENT,
    EDIT_ASSIGNMENT
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type){
        case GET_ASSIGNMENTS:
            return {
                ...state,
                ..._.mapKeys(action.payload, 'id')
            };
        case GET_ASSIGNMENT:
        case ADD_ASSIGNMENT:
        case EDIT_ASSIGNMENT:
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        case DELETE_ASSIGNMENT:
            return _.omit(state, action.payload);
        default:
            return state;
    }
};