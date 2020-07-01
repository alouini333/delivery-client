import axios from "axios";
import { SET_PRODUCTS } from "../constants";

const { REACT_APP_BACKEND_URL } = process.env;
export const setProducts = (data) => ({ type: SET_PRODUCTS, data });

export const LOAD_PRODUCTS = "LOAD_PRODUCTS";

export const loadProducts = () => (dispatch) =>
  axios
    .get(`${REACT_APP_BACKEND_URL}/dashboard`)
    .then((res) => dispatch(setProducts(res.data.data)))
    .catch(function (error) {
      console.log(error);
    });
