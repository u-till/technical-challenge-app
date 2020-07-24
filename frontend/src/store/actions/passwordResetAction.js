import Axios from "../../axios/";
import {
  nonFieldVerificationError,
  verificationError,
} from "./verificationAction";


export const passwordResetCodeAction = ({ email }) => async (dispatch) => {
  try {
    const response = await Axios.post("users/password/reset/code/", { email});
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