import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import auth from './auth';
import lectures from './lectures';

import { LOGOUT_SUCCESS } from '../actions/types';

// export default combineReducers({
//     form: formReducer,
//     lectures,
//     auth
// });

const appReducer = combineReducers({
    form: formReducer,
    lectures,
    auth
});

const rootReducer = (state, action) => {
    if (action.type === LOGOUT_SUCCESS) {
        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;