import {
  GET_USER_INFO,
  DELETE_USER,
  EDIT_USER,
  CREATE_USER,
  VERIFICATION_ERROR,
} from "../actionTypes";
import Axios from "../../axios";

export const getUserInfo = (data) => {
  return {
    type: GET_USER_INFO,
    payload: data,
  };
};

export const getUserInformationAction = (userId) => async (dispatch) => {
  try {
    const response = await Axios.get(`/users/edit/${userId}/`);
    dispatch(getUserInfo(response.data));
  } catch (error) {
    console.log("Error during verification process", error);
    return error;
  }
};
