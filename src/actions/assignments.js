import axios from 'axios';
import { reset } from 'redux-form';

import { tokenConfig } from './auth';
import {ip} from '../settings';

import {
    GET_ASSIGNMENTS,
    GET_ASSIGNMENT,
    ADD_ASSIGNMENT,
    DELETE_ASSIGNMENT,
    EDIT_ASSIGNMENT
} from './types';

export const getAssignments = (lecture_id) => async (dispatch, getState) => {
    const res = await axios.get(`${ip}/dashboard/assignments/${lecture_id}/`, tokenConfig(getState));
    dispatch({
        type: GET_ASSIGNMENTS,
        payload: res.data.results
    });
};

export const getAssignment = (id) => async (dispatch, getState) => {
    const res = await axios.get(`${ip}/dashboard/assignment/${id}/`, tokenConfig(getState));
    dispatch({
        type: GET_ASSIGNMENT,
        payload: res.data
    });
};

export const addAssignment = (formValues) => async (dispatch, getState) => {
    const res = await axios.post(`${ip}/dashboard/assignment/`, {...formValues}, tokenConfig(getState));
    dispatch({
        type: ADD_ASSIGNMENT,
        payload: res.data
    });
    dispatch(reset('assignmentForm'));
};

export const deleteAssignment = id => async (dispatch, getState) => {
    await axios.delete(`${ip}/dashboard/assignment/${id}/`, tokenConfig(getState));
    dispatch({
        type: DELETE_ASSIGNMENT,
        payload: id
    });
};

export const editAssignment = (id, formValues) => async (dispatch, getState) => {
    const res = await axios.patch(`${ip}/dashboard/assignment/${id}/`, formValues, tokenConfig(getState));
    dispatch({
        type: EDIT_ASSIGNMENT,
        payload: res.data
    });
};