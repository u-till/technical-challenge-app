import {
  GET_ALL_QUESTIONS,
  RESET_TARGET_QUESTION,
  SET_TARGET_QUESTION,
} from "../actionTypes";

const initialState = {
  allQuestions: null,
  targetQuestion: null,
};

export const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_QUESTIONS:
      return {
        ...state,
        allQuestions: action.payload,
      };
    case SET_TARGET_QUESTION:
      return {
        ...state,
        targetQuestion: action.payload,
      };
    case RESET_TARGET_QUESTION:
      return {
        ...state,
        targetQuestion: null,
      };
    default:
      return state;
  }
};
