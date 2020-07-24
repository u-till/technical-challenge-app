import {
  GET_ALL_CHALLENGES,
  GET_ALL_CHALLENGES_FOR_USER,
  GET_USERS_CHALLENGE,
} from "../actionTypes";

const initialState = {
  userChallenges: [],
  targetChallenge: null,
  allChallenges: null,
};

export const challengeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CHALLENGES_FOR_USER: {
      return {
        ...state,
        userChallenges: action.payload,
      };
    }
    case GET_USERS_CHALLENGE: {
      return {
        ...state,
        targetChallenge: action.payload,
      };
    }
    case GET_ALL_CHALLENGES: {
      return {
        ...state,
        allChallenges: action.payload,
      };
    }
    default:
      return state;
  }
};
