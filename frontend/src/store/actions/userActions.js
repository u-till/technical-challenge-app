import { GET_USER_INFO, GET_ALL_USERS } from "../actionTypes";
import Axios from "../../axios";
import {
  nonFieldVerificationError,
  verificationError,
} from "./verificationAction";

export const getUserInfo = (data) => {
  return {
    type: GET_USER_INFO,
    payload: data,
  };
};

export const getAllUsers = (data) => {
  return {
    type: GET_ALL_USERS,
    payload: data,
  };
};

export const getUserInformationAction = (userId) => async (dispatch) => {
  try {
    const response = await Axios.get(`/users/edit/${userId}/`);
    dispatch(getUserInfo(response.data));
  } catch (error) {
    console.log("Error during Verification>", error);
    return error;
  }
};

export const getAllUsersAction = () => async (dispatch) => {
  try {
    const response = await Axios.get("users/list/");
    dispatch(getAllUsers(response.data));
    return response;
  } catch (error) {
    console.log("Error during Get All Users>", error);
    return error;
  }
};

export const editSpecificUserAction = (userId, data) => async (dispatch) => {
  try {
    const response = await Axios.patch(`/users/edit/${userId}/`, data);
    return response;
  } catch (error) {
    let errors = {};
    for (let i of Object.keys(error.response.data)) {
      errors[i] = error.response.data[i].join(" ");
    }
    if (
      errors.detail === "Your email doesn't match any profile or is invalid."
    ) {
      dispatch(nonFieldVerificationError(errors.detail));
    } else {
      dispatch(verificationError(errors));
    }
    return error;
  }
};

export const createUserAction = (userData) => async (dispatch) => {
  try {
    const response = await Axios.post("/users/create/", userData);
    return response;
  } catch (error) {
    let errors = {};
    for (let i of Object.keys(error.response.data)) {
      errors[i] = error.response.data[i].join(" ");
    }
    if (
      errors.detail === "Your email doesn't match any profile or is invalid."
    ) {
      dispatch(nonFieldVerificationError(errors.detail));
    } else {
      dispatch(verificationError(errors));
    }
    return error;
  }
};

export const resendUserValidationAction = (userId) => async (dispatch) => {
  try {
    const response = await Axios.patch(`/users/resend/create/${userId}/`);
    return response;
  } catch (error) {
    console.log("Error during Resend Validation Email>", error);
    return error;
  }
};
