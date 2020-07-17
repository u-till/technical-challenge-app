import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { verificationReducer } from "./verificationReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  authReducer,
  verificationReducer,
  userReducer,
});
