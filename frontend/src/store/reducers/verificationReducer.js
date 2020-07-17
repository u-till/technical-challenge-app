import {VERIFICATION_ERROR, RESET_ERRORS} from "../actionTypes";

const initialState = {
    email: '',
    error: null,
    verificationErrors: {
        'email': null,
        'first_name': null,
        'last_name': null,
        'password': null,
        'password_repeat': null,
        'phone': null,
        'avatar': null,
        'non_field_errors': null,
    }
};

export const verificationReducer = (state = initialState, action) => {
    switch(action.type) {
        case VERIFICATION_ERROR: {
            return {
                ...state,
                verificationErrors: {...state.verificationErrors, ...action.payload}
            }
        }
        case RESET_ERRORS: {
            return initialState
        }
        default:
            return state
    }
};