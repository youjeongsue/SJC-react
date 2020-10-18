import axios from 'axios';
import { reset } from 'redux-form';

import { tokenConfig } from './auth';
import {ip} from '../settings';

import {
    GET_SVIDEOS,
    GET_SVIDEO,
    ADD_SVIDEO,
    DELETE_SVIDEO,
    EDIT_SVIDEO
} from './types';

export const getSVideos = (assignment_id) => async (dispatch, getState) => {
    const res = await axios.get(`${ip}/dashboard/svideos/${assignment_id}/`, tokenConfig(getState));
    dispatch({
        type: GET_SVIDEOS,
        payload: res.data.results
    });
};

export const getSVideo = (id) => async (dispatch, getState) => {
    const res = await axios.get(`${ip}/dashboard/svideo/${id}/`, tokenConfig(getState));
    dispatch({
        type: GET_SVIDEO,
        payload: res.data
    });
};

export const addSVideo = (formValues, assignment_id) => async (dispatch, getState) => {
    console.log(formValues);
    const res = await axios.post(`${ip}/dashboard/svideos/${assignment_id}/`, {...formValues}, tokenConfig(getState));
    dispatch({
        type: ADD_SVIDEO,
        payload: res.data
    });
    dispatch(reset('svideoForm'));
};

export const deleteSVideo = (id) => async (dispatch, getState) => {
    await axios.delete(`${ip}/dashboard/svideo/${id}/`, tokenConfig(getState));
    dispatch({
        type: DELETE_SVIDEO,
        payload: id
    });
};

export const editSVideo = (id, formValues) => async (dispatch, getState) => {
    const res = await axios.patch(`${ip}/dashboard/svideo/${id}/`, formValues, tokenConfig(getState));
    dispatch({
        type: EDIT_SVIDEO,
        payload: res.data
    });
};