import Axios from "../../axios/";

import { VERIFICATION_ERROR, RESET_ERRORS } from "../actionTypes";

export const verificationError = (errors) => {
  return {
    type: VERIFICATION_ERROR,
    payload: errors,
  };
};

export const resetError = () => {
  return {
    type: RESET_ERRORS,
  };
};

export const verificationAction = (id, data) => async (dispatch) => {
  try {
    const response = await Axios.patch(`users/validation/${id}/`, data);
    return response;
  } catch (error) {
    console.log("Error during getting user data", error);
    return error;
  }
};
