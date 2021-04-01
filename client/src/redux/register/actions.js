import { SET_USER_ID, SET_DETAILS, SET_QUESTION_DETAILS } from '../actions';

export const setUserId = (data) => {
  return {
    type: SET_USER_ID,
    payload: data,
  };
};

export const setDetails = (data) => {
  return {
    type: SET_DETAILS,
    payload: data,
  };
};

export const setQuestionDetails = (data) => {
  return {
    type: SET_QUESTION_DETAILS,
    payload: data,
  };
};