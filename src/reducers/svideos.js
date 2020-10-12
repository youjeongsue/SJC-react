import _ from 'lodash';
import {
    GET_SVIDEOS,
    GET_SVIDEO,
    ADD_SVIDEO,
    DELETE_SVIDEO,
    EDIT_SVIDEO
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type){
        case GET_SVIDEOS:
            return {
                ..._.mapKeys(action.payload, 'id')
            };
        case GET_SVIDEO:
        case ADD_SVIDEO:
        case EDIT_SVIDEO:
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        case DELETE_SVIDEO:
            return _.omit(state, action.payload);
        default:
            return state;
    }
};