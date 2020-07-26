import baseUrl from "../constants";
import { store } from "../store";
import axios from "axios";

// Sets Axios defaults for Url and Headers, to prevent needing to define in each action
const Axios = axios.create({
  baseUrl: baseUrl,
});
Axios.defaults.baseURL = baseUrl;
Axios.defaults.headers.post["Content-Type"] = "application/json";
// Accesses the Redux store directly with getState and adds  the Token for Authentication if token is defined
Axios.interceptors.request.use(function (config) {
  const token = store.getState().authReducer.token;
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});

export default Axios;
