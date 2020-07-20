import Axios from "../../axios/";
import { USER_LOGIN } from "../actionTypes";
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
    console.log(error.response.data);
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
