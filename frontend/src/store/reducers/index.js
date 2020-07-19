import {combineReducers} from "redux";
import {authReducer} from "./authReducer";
import {verificationReducer} from "./verificationReducer";
import {userReducer} from "./userReducer";
import {questionReducer} from "./questionReducer";
import {tipReducer} from "./tipReducer";

export const rootReducer = combineReducers({
    authReducer,
    verificationReducer,
    userReducer,
    questionReducer,
    tipReducer,
});
