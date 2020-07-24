import axios from 'axios';
import { reset } from 'redux-form';

import { tokenConfig } from './auth';

import {
    GET_COMMENTS,
    GET_COMMENT,
    ADD_COMMENT,
    DELETE_COMMENT,
    EDIT_COMMENT
} from './types';

export const getComments = (assignment_id) => async (dispatch, getState) => {
    const res = await axios.get(`http://127.0.0.1:8000/dashboard/comments/${assignment_id}/`, tokenConfig(getState));
    dispatch({
        type: GET_COMMENTS,
        payload: res.data.results
    });
};

export const getComment = (id) => async (dispatch, getState) => {
    const res = await axios.get(`http://127.0.0.1:8000/dashboard/comment/${id}/`, tokenConfig(getState));
    dispatch({
        type: GET_COMMENT,
        payload: res.data
    });
};

export const addComment = (formValues) => async (dispatch, getState) => {
    const res = await axios.post('http://127.0.0.1:8000/dashboard/comment/', {...formValues}, tokenConfig(getState));
    dispatch({
        type: ADD_COMMENT,
        payload: res.data
    });
    dispatch(reset('commentForm'));
};

export const deleteComment = (id) => async (dispatch, getState) => {
    await axios.delete(`http://127.0.0.1:8000/dashboard/comment/${id}/`, tokenConfig(getState));
    dispatch({
        type: DELETE_COMMENT,
        payload: id
    });
};

export const editComment = (id, formValues) => async (dispatch, getState) => {
    const res = await axios.patch(`http://127.0.0.1:8000/dashboard/comment/${id}/`, formValues, tokenConfig(getState));
    dispatch({
        type: EDIT_COMMENT,
        payload: res.data
    });
};