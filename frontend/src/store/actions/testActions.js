import Axios from "../../axios";

export const runTestAction = (testNumber, testData) => async (dispatch) => {
  try {
    const response = await Axios.post(`/tests/${testNumber}/`, testData);
    return response;
  } catch (error) {
    console.log("Error running a test>", error);
    return error;
  }
};

export const getTestCode = (challengeData) => async (dispatch) => {
  try {
    const response = await Axios.post('/tests/getcode/', challengeData);
    return response;
  } catch (error) {
    console.log("Error fetching Candidate Code>", error);
    return error
  }
};
