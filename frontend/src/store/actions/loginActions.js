import Axios from '../../axios/';


import {USER_LOGIN} from "../actionTypes"


export const login = (token) => {
    return {
        type : USER_LOGIN,
        payload : {
            token
        }
    }
}

export const loginAction = ({email, password}) => async (dispatch) => {
    try {
        const response = await Axios.post('auth/token/', {email, password});
        const token = response.data.access;
        if (token) {
           dispatch(login(token));
           localStorage.setItem('token', token)
        }
        return response
    }
    catch(error) {
        console.log('Error durring login: ', error)
        return error
    }
}