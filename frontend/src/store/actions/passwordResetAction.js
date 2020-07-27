import Axios from "../../axios/";
import {
  nonFieldVerificationError,
  verificationError,
} from "./verificationAction";

export const passwordResetCodeAction = ({ email }) => async (dispatch) => {
  try {
    const response = await Axios.post("users/password/reset/code/", { email });
    return response;
  } catch (error) {
    if (
      error.response.data.detail ===
      "Your email doesn't match any profile or is invalid."
    ) {
      dispatch(nonFieldVerificationError(error.response.data.detail));
    }
    return error;
  }
};

export const confirmPasswordResetAction = (resetData) => async (dispatch) => {
  try {
    const response = await Axios.patch(
      "users/password/reset/validation/",
      resetData
    );
    return response;
  } catch (error) {
    if (
      error.response.data.detail ===
      "Your email doesn't match any profile or is invalid."
    ) {
      dispatch(nonFieldVerificationError(error.response.data.detail));
    } else {
      let errors = {};
      for (let i of Object.keys(error.response.data)) {
        errors[i] = error.response.data[i].join(" ");
      }
      if (
        errors.detail === "Your Validation Code is incorrect" ||
        errors.detail === "Password and Password Repeat do not match"
      ) {
        dispatch(nonFieldVerificationError(errors.detail));
      } else {
        dispatch(verificationError(errors));
      }
    }
    return error;
  }
};
