import Axios from "../../axios";
import { login } from "./loginActions";

export const getChallenge = () => async (dispatch) => {
  let dateNow = new Date();
  const time = await Axios.patch("challenges/start/2/", { timer: dateNow });
  const response = await Axios.get("challenges/edit/2/");
  if (response.status === 200) {
    return response.data.timer;
  }
};
