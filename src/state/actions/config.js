import axios from "axios";
import { API_URL, LOAD_CONFIGURATION } from "../constants";

export const loadConfig = (data) => ({
  type: LOAD_CONFIGURATION,
  data: data,
});

export const getConfig = () => (dispatch) =>
  axios
    .get(`${API_URL}/settings`)
    .then((res) => {
      dispatch(loadConfig(res.data.data));
    })
    .catch(function (error) {
      if (error.response.status === 500) {
        console.log(error.response);
      }
    });
