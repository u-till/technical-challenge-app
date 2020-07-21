import { GET_USER_INFO, GET_ALL_USERS } from "../actionTypes";

const initialState = {
  targetUser: null,
  allUsers: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_INFO:
      return {
        ...state,
        targetUser: action.payload,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    default:
      return state;
  }
};
