import {GET_ALL_CHALLENGES_FOR_USER} from '../actionTypes';

const initialState = {
    userChallenges: []
};

export const challengeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_CHALLENGES_FOR_USER: {
            return {
                ...state,
                userChallenges: action.payload
            }
        }
        default:
            return state
    }
};