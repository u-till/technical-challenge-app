import Axios from "../../axios/";
import {
  VERIFICATION_ERROR,
  RESET_ERRORS,
  NON_FIELD_VERIFICATION_ERROR,
} from "../actionTypes";

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

export const nonFieldVerificationError = (error) => {
  return {
    type: NON_FIELD_VERIFICATION_ERROR,
    payload: error,
  };
};

export const verificationAction = (id, data) => async (dispatch) => {
  try {
    const response = await Axios.patch(`users/validation/${id}/`, data);
    return response;
  } catch (error) {
    let errors = {};
    for (let i of Object.keys(error.response.data)) {
      errors[i] = error.response.data[i].join(" ");
    }
    if (
      errors.detail === "Password and Password Repeat do not match" ||
      errors.detail === "You must choose a different password" ||
      errors.detail === "Your email doesn't match any User or is invalid."
    ) {
      dispatch(nonFieldVerificationError(errors.detail));
    } else {
      dispatch(verificationError(errors));
    }
    return error;
  }
};
