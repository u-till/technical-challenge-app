import Axios from "../../axios";
import {
  GET_ALL_CHALLENGES,
  GET_ALL_CHALLENGES_FOR_USER,
  GET_USERS_CHALLENGE,
} from "../actionTypes";

export const getAllUserChallenges = (challenges) => {
  return {
    type: GET_ALL_CHALLENGES_FOR_USER,
    payload: challenges,
  };
};

export const getUserChallenge = (challenge) => {
  return {
    type: GET_USERS_CHALLENGE,
    payload: challenge,
  };
};

export const getAllChallenges = (challenges) => {
  return {
    type: GET_ALL_CHALLENGES,
    payload: challenges,
  };
};

export const getAllUserChallengesAction = () => async (dispatch) => {
  try {
    const response = await Axios.get("challenges/me/");
    dispatch(getAllUserChallenges(response.data));
    return response;
  } catch (error) {
    console.log("Error getting all User Challenges>", error);
  }
};

export const getUserChallengeAction = (challengeId) => async (
  dispatch,
  getState
) => {
  try {
    const response = await Axios.get(`challenges/challenge/${challengeId}/`);
    dispatch(getUserChallenge(response.data));
    return [response, getState().challengeReducer.targetChallenge.started];
  } catch (error) {
    console.log("Error getting a specific User Challenge>", error);
    return error;
  }
};

export const setUserChallengeScoreAction = (challengeId, score) => async (
  dispatch
) => {
  try {
    const response = await Axios.patch(
      `challenges/score/${challengeId}/`,
      score
    );
    return response;
  } catch (error) {
    console.log("Error setting a candidates Challenge Score>", error);
    return error;
  }
};

export const createUserChallengeAction = (candidateId) => async (dispatch) => {
  try {
    const response = await Axios.post("challenges/create/", candidateId);
    return response;
  } catch (error) {
    console.log("Error creating a new Challenge>", error);
    return error;
  }
};

export const setChallengeStartTimeAction = (challengeId, time) => async (
  dispatch
) => {
  try {
    const response = await Axios.patch(
      `challenges/start/${challengeId}/`,
      time
    );
    return response;
  } catch (error) {
    console.log("Error setting Challenge Start Time>", error);
    return error;
  }
};

export const getAllChallengesAction = () => async (dispatch) => {
  try {
    const response = await Axios.get("challenges/list/");
    dispatch(getAllChallenges(response.data));
    return response;
  } catch (error) {
    console.log("Error getting all Challenges>", error);
    return error;
  }
};

export const resendChallengeInvitationAction = (challengeId) => async (
  dispatch
) => {
  try {
    const response = await Axios.patch(
      `challenges/resend/challenge/${challengeId}/`
    );
    return response;
  } catch (error) {
    console.log("Error resending Challenge Invitation Email");
    return error;
  }
};

export const resendChallengeResultAction = (challengeId) => async (
  dispatch
) => {
  try {
    const response = await Axios.patch(
      `challenges/resend/score/${challengeId}/`
    );
    return response;
  } catch (error) {
    console.log("Error resending Challenge Result Score");
    return error;
  }
};
