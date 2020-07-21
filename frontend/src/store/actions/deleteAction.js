import Axios from "../../axios";

export const deleteItemAction = (type, typeId) => async (dispatch) => {
  try {
    const response = await Axios.delete(`${type}/edit/${typeId}/`);
    return response;
  } catch (error) {
    console.log(`Error while deleting a ${type}>`, error);
    return error;
  }
};
