import axios from "axios";
import { LOAD_CONFIGURATION } from "../constants";

export const loadConfig = (data) => ({
  type: LOAD_CONFIGURATION,
  data: data,
});

const { REACT_APP_BACKEND_URL } = process.env;

export const getConfig = () => (dispatch) =>
  axios
    .get(`${REACT_APP_BACKEND_URL}/settings`)
    .then((res) => {
      dispatch(loadConfig(res.data.data));
    })
    .catch(function (error) {
      console.log(error.response);
    });
