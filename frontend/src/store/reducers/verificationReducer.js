import {
  VERIFICATION_ERROR,
  RESET_ERRORS,
  NON_FIELD_VERIFICATION_ERROR,
} from "../actionTypes";

const initialState = {
  email: "",
  non_field_error: null,
  verificationErrors: {
    code: null,
    email: null,
    first_name: null,
    last_name: null,
    password: null,
    password_repeat: null,
    phone: null,
    avatar: null,
    name: null,
    instructions: null,
    program: null,
    tests_for_question: ["", "", ""],
  },
};

export const verificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case VERIFICATION_ERROR: {
      return {
        ...state,
        verificationErrors: { ...state.verificationErrors, ...action.payload },
      };
    }
    case NON_FIELD_VERIFICATION_ERROR: {
      return {
        ...state,
        non_field_error: action.payload,
      };
    }
    case RESET_ERRORS: {
      return initialState;
    }
    default:
      return state;
  }
};
