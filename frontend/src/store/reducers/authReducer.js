import { SET_LOGGED_IN_USER, USER_LOGIN, USER_LOGOUT } from "../actionTypes";

const initialState = {
  token: null,
  authenticated: false,
  userObj: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN: {
      return {
        ...state,
        token: action.payload,
        authenticated: true,
      };
    }
    case USER_LOGOUT: {
      localStorage.clear();
      return initialState;
    }
    case SET_LOGGED_IN_USER: {
      return {
        ...state,
        userObj: action.payload,
      };
    }
    default:
      return state;
  }
};
