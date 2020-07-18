import Axios from "../../axios";
import { GET_ALL_QUESTIONS, SET_TARGET_QUESTION } from "../actionTypes";

export const getAllQuestions = (data) => {
    return {
        type: GET_ALL_QUESTIONS,
        payload: data
    }
};

export const setTargetQuestion = (data) => {
    return {
        type: SET_TARGET_QUESTION,
        payload: data
    }
};

export const getAllQuestionsAction = () => async (dispatch) => {
    try {
        const response = await Axios.get('questions/list/');
        dispatch(getAllQuestions(response.data))
    } catch (error) {
        console.log("Error during Get All Questions>", error);
        return error
    }
};