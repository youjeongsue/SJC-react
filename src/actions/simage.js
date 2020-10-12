import axios from 'axios';
import { reset } from 'redux-form';

import { tokenConfig } from './auth';
import {ip} from '../settings';

import {
    GET_SIMAGES,
    GET_SIMAGE,
    ADD_SIMAGE,
    DELETE_SIMAGE,
    EDIT_SIMAGE
} from './types';

export const getSImages = (student_video_id) => async (dispatch, getState) => {
    const res = await axios.get(`${ip}/dashboard/simages/${student_video_id}/`, tokenConfig(getState));
    dispatch({
        type: GET_SIMAGES,
        payload: res.data.results
    });
};

export const getSImage = (id) => async (dispatch, getState) => {
    const res = await axios.get(`${ip}/dashboard/simage/${id}/`, tokenConfig(getState));
    dispatch({
        type: GET_SIMAGE,
        payload: res.data
    });
};

export const addSImage = (formValues) => async (dispatch, getState) => {
    const res = await axios.post(`${ip}/dashboard/simage/`, {...formValues}, tokenConfig(getState));
    dispatch({
        type: ADD_SIMAGE,
        payload: res.data
    });
    dispatch(reset('simageForm'));
};

export const deleteSVideo = (id) => async (dispatch, getState) => {
    await axios.delete(`${ip}/dashboard/simage/${id}/`, tokenConfig(getState));
    dispatch({
        type: DELETE_SIMAGE,
        payload: id
    });
};

export const editSImage = (id, formValues) => async (dispatch, getState) => {
    const res = await axios.patch(`${ip}/dashboard/simage/${id}/`, formValues, tokenConfig(getState));
    dispatch({
        type: EDIT_SIMAGE,
        payload: res.data
    });
};