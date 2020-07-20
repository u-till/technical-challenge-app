import { GET_ALL_TIPS_FOR_QUESTION } from "../actionTypes";

const initialState = {
  targetQuestionTips: null,
};

export const tipReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TIPS_FOR_QUESTION:
      return {
        ...state,
        targetQuestionTips: action.payload,
      };
    default:
      return state;
  }
};
