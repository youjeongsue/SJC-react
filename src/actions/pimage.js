import axios from 'axios';
import { reset } from 'redux-form';

import { tokenConfig } from './auth';
import {ip} from '../settings';

import {
    GET_PIMAGES,
    GET_PIMAGE,
    ADD_PIMAGE,
    DELETE_PIMAGE,
    EDIT_PIMAGE
} from './types';

export const getPImages = (assignment_id) => async (dispatch, getState) => {
    const res = await axios.get(`${ip}/dashboard/pimages/${assignment_id}/`, tokenConfig(getState));
    dispatch({
        type: GET_PIMAGES,
        payload: res.data.results
    });
};

export const getPImage = (id) => async (dispatch, getState) => {
    const res = await axios.get(`${ip}/dashboard/pimage/${id}/`, tokenConfig(getState));
    dispatch({
        type: GET_PIMAGE,
        payload: res.data
    });
};

export const addPImage = (formValues) => async (dispatch, getState) => {
    const res = await axios.post(`${ip}/dashboard/pimage/`, {...formValues}, tokenConfig(getState));
    dispatch({
        type: ADD_PIMAGE,
        payload: res.data
    });
    dispatch(reset('pimageForm'));
};

export const deletePVideo = (id) => async (dispatch, getState) => {
    await axios.delete(`${ip}/dashboard/pimage/${id}/`, tokenConfig(getState));
    dispatch({
        type: DELETE_PIMAGE,
        payload: id
    });
};

export const editPImage = (id, formValues) => async (dispatch, getState) => {
    const res = await axios.patch(`${ip}/dashboard/pimage/${id}/`, formValues, tokenConfig(getState));
    dispatch({
        type: EDIT_PIMAGE,
        payload: res.data
    });
};