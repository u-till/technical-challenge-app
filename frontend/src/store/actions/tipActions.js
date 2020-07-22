import Axios from "../../axios";
import { GET_ALL_TIPS_FOR_QUESTION } from "../actionTypes";

export const getTipsForQuestion = (data) => {
  return {
    type: GET_ALL_TIPS_FOR_QUESTION,
    payload: data,
  };
};

export const getTipsForQuestionAction = (questionId) => async (dispatch) => {
  try {
    const response = await Axios.get(`tips/list/${questionId}/`);
    dispatch(getTipsForQuestion(response.data));
    return response;
  } catch (error) {
    console.log("Error during Get Tip for Question>", error);
    return error;
  }
};

export const updateTipForQuestionAction = (tipId, tipData) => async (
  dispatch
) => {
  try {
    const response = await Axios.patch(`tips/edit/${tipId}/`, tipData);
    return response;
  } catch (error) {
    console.log("Error during Update a Tip>", error);
    return error;
  }
};

export const createTipForQuestionAction = (questionId, tipData) => async (
  dispatch
) => {
  try {
    const response = await Axios.post(`tips/create/${questionId}/`, tipData);
    return response;
  } catch (error) {
    console.log("Error during Create a Tip>", error);
    return error;
  }
};
