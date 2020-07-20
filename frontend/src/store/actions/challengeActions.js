import Axios from "../../axios";
import {GET_ALL_CHALLENGES_FOR_USER} from '../actionTypes';

export const getAllUserChallenges = (challenges) => {
      return {
          type: GET_ALL_CHALLENGES_FOR_USER,
          payload: challenges
      }
};

export const getAllUserChallengesAction = () => async (dispatch) => {
    try {
        const response = await Axios.get('challenges/me/');
        dispatch(getAllUserChallenges(response.data));
        return response
    } catch (error) {
        console.log('Error getting all User Challenges>', error)
    }
}