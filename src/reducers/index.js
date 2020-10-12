import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import auth from './auth';
import lectures from './lectures';
import assignments from './assignments';
import pimages from './pimages';
import simages from './simages';
import svideos from './svideos';

import { LOGOUT_SUCCESS } from '../actions/types';

const appReducer = combineReducers({
    form: formReducer,
    lectures,
    assignments,
    pimages,
    simages,
    svideos,
    auth
});

const rootReducer = (state, action) => {
    if (action.type === LOGOUT_SUCCESS) {
        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;