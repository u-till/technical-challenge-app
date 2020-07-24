import Axios from "../../axios";
import {
  GET_ALL_QUESTIONS,
  RESET_TARGET_QUESTION,
  SET_TARGET_QUESTION,
} from "../actionTypes";
import {
  nonFieldVerificationError,
  verificationError,
} from "./verificationAction";

export const getAllQuestions = (data) => {
  return {
    type: GET_ALL_QUESTIONS,
    payload: data,
  };
};

export const setTargetQuestion = (data) => {
  return {
    type: SET_TARGET_QUESTION,
    payload: data,
  };
};

export const resetTargetQuestion = () => {
  return {
    type: RESET_TARGET_QUESTION,
  };
};

export const getAllQuestionsAction = () => async (dispatch) => {
  try {
    const response = await Axios.get("questions/list/");
    dispatch(getAllQuestions(response.data));
  } catch (error) {
    console.log("Error during Get All Questions>", error);
    return error;
  }
};

export const updateQuestionAction = (questionId, questionData) => async (
  dispatch
) => {
  try {
    const response = await Axios.patch(
      `questions/edit/${questionId}/`,
      questionData
    );
    return response;
  } catch (error) {
    console.log("Error during Update A Question>", error);
    return error;
  }
};

export const createNewQuestionAction = (questionData) => async (dispatch) => {
  try {
    const response = await Axios.post("questions/create/", questionData);
    return response;
  } catch (error) {
    let errors = {};
    for (let i of Object.keys(error.response.data)) {
      errors[i] = error.response.data[i].join(" ");
    }
    if (errors.detail === "") {
      dispatch(nonFieldVerificationError(errors.detail));
    } else {
      dispatch(verificationError(errors));
    }
    return error;
  }
};
