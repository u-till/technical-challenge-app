import {GET_USER_INFO, DELETE_USER, EDIT_USER, CREATE_USER} from "../actionTypes";

const initialState = {
        email: '',
        first_name: '',
        last_name: '',
        phone: '',
}

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_USER_INFO:
            return {
                ...state,
                email: action.payload.email,
                first_name: action.payload.first_name,
                last_name: action.payload.last_name,
                phone: action.payload.phone,
            }
        default: return state
    }
}