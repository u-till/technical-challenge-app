import Axios from "../../axios";
import {
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

export const getAllUserChallengesAction = () => async (dispatch) => {
  try {
    const response = await Axios.get("challenges/me/");
    dispatch(getAllUserChallenges(response.data));
    return response;
  } catch (error) {
    console.log("Error getting all User Challenges>", error);
  }
};

export const getUserChallengeAction = (challengeId) => async (dispatch) => {
  try {
    const response = await Axios.get(`challenges/challenge/${challengeId}/`);
    dispatch(getUserChallenge(response.data));
    return response;
  } catch (error) {
    console.log("Error getting a specific User Challenge>", error);
    return error;
  }
};

// export const getChallenge = () => async (dispatch) => {
//   let dateNow = new Date();
//   const time = await Axios.patch("challenges/start/2/", { timer: dateNow });
//   const response = await Axios.get("challenges/edit/2/");
//   if (response.status === 200) {
//     return response.data.timer;
//   }
// };
