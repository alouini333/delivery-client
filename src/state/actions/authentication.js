import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  REFRESH_TOKEN,
  REGISTER_REQUEST,
} from "../constants";

const { REACT_APP_BACKEND_URL } = process.env;

export const changeUser = (user) => ({
  type: LOGIN_REQUEST,
  payload: user,
});

export const logoutUser = () => ({
  type: LOGOUT_REQUEST,
});

export const refreshToken = (token) => ({
  type: REFRESH_TOKEN,
  payload: token,
});

export const register = (user) => ({
  type: REGISTER_REQUEST,
  payload: user,
});

export const loginUser = (payload) => (dispatch) =>
  axios
    .post(
      `${REACT_APP_BACKEND_URL}/auth/login?email=${payload.email}&password=${payload.password}`
    )
    .then((res) => {
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data.data));
        localStorage.setItem("token", res.data.token);
        localStorage.setItem(
          "message",
          JSON.stringify({ msg: `Successful login.`, variant: "success" })
        );
        const date = new Date();
        const expires_in = date.getTime() + res.data.expires_in * 1000;
        localStorage.setItem("expires_in", JSON.stringify(expires_in));
        dispatch(changeUser(res.data.data));
      } else {
        localStorage.setItem(
          "message",
          JSON.stringify({ msg: `Error on login.`, variant: "error" })
        );
      }
    })
    .catch(function (error) {
      console.log(error);
    });

export const signup = (payload) => (dispatch) =>
  axios
    .post(`${REACT_APP_BACKEND_URL}/auth/signup`, {
      name: payload.name,
      last_name: payload.last_name,
      gender: payload.gender,
      password: payload.password,
      password_confirmation: payload.password_confirmation,
      phone: payload.phone,
      email: payload.email,
    })
    .then((res) => {
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data.data));
        localStorage.setItem("token", res.data.token);
        const date = new Date();
        const expires_in = date.getTime() + res.data.expires_in * 1000;
        localStorage.setItem("expires_in", JSON.stringify(expires_in));
        dispatch(changeUser(res.data.data));
      }
    });

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  axios
    .post(
      `${REACT_APP_BACKEND_URL}/auth/logout`,
      {},
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((data) => {
      dispatch(changeUser(null));
    })
    .catch(function (error) {
      if (error.response.status === 500) {
        console.log(error.response);
      }
    });
};

export const changeToken = () => (dispatch) =>
  axios
    .post(
      `${REACT_APP_BACKEND_URL}/auth/refresh`,
      {},
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((res) => {
      const date = new Date();
      const expires_in = date.getTime() + res.data.expires_in * 1000;
      localStorage.setItem("expires_in", expires_in);
      dispatch(changeUser(res.data.data));
    })
    .catch(function (error) {
      if (error.response.status === 401) {
        localStorage.removeItem("user");
        localStorage.removeItem("expires_in");
        localStorage.removeItem("token");
      } else if (error.response.status === 500) {
        console.log(error.response);
      }
    });
