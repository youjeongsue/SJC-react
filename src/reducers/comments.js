import _ from 'lodash';
import {
    GET_COMMENTS,
    GET_COMMENT,
    ADD_COMMENT,
    DELETE_COMMENT,
    EDIT_COMMENT
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type){
        case GET_COMMENTS:
            return {
                ...state,
                ..._.mapKeys(action.payload, 'id')
            };
        case GET_COMMENT:
        case ADD_COMMENT:
        case EDIT_COMMENT:
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        case DELETE_COMMENT:
            return _.omit(state, action.payload);
        default:
            return state;
    }
};