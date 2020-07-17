import _ from 'lodash';
import {
    GET_LECTURES,
    GET_LECTURE,
    ADD_LECTURE,
    DELETE_LECTURE,
    EDIT_LECTURE
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type){
        case GET_LECTURES:
            return {
                ...state,
                ..._.mapKeys(action.payload, 'id')
            };
        case GET_LECTURE:
        case ADD_LECTURE:
        case EDIT_LECTURE:
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        case DELETE_LECTURE:
            return _.omit(state, action.payload);
        default:
            return state;
    }
};