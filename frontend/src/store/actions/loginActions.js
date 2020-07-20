import Axios from "../../axios/";
import { SET_LOGGED_IN_USER, USER_LOGIN, USER_LOGOUT } from "../actionTypes";
import {
  nonFieldVerificationError,
  verificationError,
} from "./verificationAction";

export const login = (token) => {
  return {
    type: USER_LOGIN,
    payload: token,
  };
};

export const setLoggedInUser = (user) => {
  return {
    type: SET_LOGGED_IN_USER,
    payload: user,
  };
};

export const logoutUser = () => {
  return {
    type: USER_LOGOUT,
  };
};

export const loginAction = ({ email, password }) => async (dispatch) => {
  try {
    const response = await Axios.post("auth/token/", { email, password });
    const token = response.data.access;
    if (token) {
      dispatch(login(token));
      localStorage.setItem("token", token);
    }
    return response;
  } catch (error) {
    if (
      error.response.data.detail ===
      "No active account found with the given credentials"
    ) {
      dispatch(nonFieldVerificationError(error.response.data.detail));
    } else {
      let errors = {};
      for (let i of Object.keys(error.response.data)) {
        errors[i] = error.response.data[i].join(" ");
      }
      dispatch(verificationError(errors));
    }
    return error;
  }
};

export const setLoggedInUserAction = () => async (dispatch, getState) => {
  try {
    const response = await Axios.get("users/me/");
    await dispatch(setLoggedInUser(response.data));
    localStorage.setItem("user", JSON.stringify(response.data));
    return [response, getState().authReducer.userObj.is_staff];
  } catch (error) {
    console.log("Error retrieving logged in User data>", error);
    return error;
  }
};
