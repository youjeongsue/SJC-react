import axios from 'axios';
import { reset } from 'redux-form';

import { tokenConfig } from './auth';

import {
    GET_LECTURES,
    GET_LECTURE,
    ADD_LECTURE,
    DELETE_LECTURE,
    EDIT_LECTURE
 } from './types';

export const getLectures = () => async (dispatch, getState) => {
    const res = await axios.get('http://127.0.0.1:8000/dashboard/lectures/', tokenConfig(getState));
    dispatch({
        type: GET_LECTURES,
        payload: res.data.results
    });
};

export const getLecture = (id) => async (dispatch, getState) => {
    const res = await axios.get(`http://127.0.0.1:8000/dashboard/lectures/${id}/`, tokenConfig(getState));
    dispatch({
        type: GET_LECTURE,
        payload: res.data
    });
};

export const addLecture = (formValues) => async (dispatch, getState) => {
    const res = await axios.post('http://127.0.0.1:8000/dashboard/lectures/', {...formValues}, tokenConfig(getState));
    dispatch({
        type: ADD_LECTURE,
        payload: res.data
    });
    dispatch(reset('lectureForm'));
};

export const deleteLecture = id => async (dispatch, getState) => {
    await axios.delete(`http://127.0.0.1:8000/dashboard/lectures/${id}/`, tokenConfig(getState));
    dispatch({
        type: DELETE_LECTURE,
        payload: id
    });
};

export const editLecture = (id, formValues) => async (dispatch, getState) => {
    const res = await axios.patch(`http://127.0.0.1:8000/dashboard/lectures/${id}/`, formValues, tokenConfig(getState));
    dispatch({
        type: EDIT_LECTURE,
        payload: res.data
    });
};