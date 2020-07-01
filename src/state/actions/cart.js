import {
  ADD_TO_CART,
  DELETE_FROM_CART,
  CLEAR_CART,
  MODIFY_FROM_CART,
  LOAD_ORDERS,
  LOAD_ORDER,
  LOAD_PRICING,
} from "../constants";
import axios from "axios";

const { REACT_APP_BACKEND_URL } = process.env;

export const addTocart = (item, quantity) => ({
  type: ADD_TO_CART,
  payload: item,
  quantity: quantity,
});

export const deleteFromCart = (id) => ({
  type: DELETE_FROM_CART,
  id: id,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

export const modifyFromCart = (payload) => ({
  type: MODIFY_FROM_CART,
  payload: payload,
});

export const loadOrders = (payload) => ({
  type: LOAD_ORDERS,
  payload: payload,
});

export const loadOrder = (payload) => ({
  type: LOAD_ORDER,
  payload: payload,
});

export const loadPricing = (payload) => ({
  type: LOAD_PRICING,
  payload: payload,
});

export const checkout = (payload) => (dispatch) =>
  axios
    .post(
      `${REACT_APP_BACKEND_URL}/orders`,
      {
        name: payload.name,
        last_name: payload.last_name,
        phone: payload.phone,
        address: payload.address,
        additional_notes: payload.additional_notes,
        items: payload.items,
        post_code: payload.post_code,
        floor: payload.floor,
        city: payload.city,
        method: payload.method,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((res) => {
      if (res.status === 200) {
        dispatch(clearCart());
      } else {
        localStorage.setItem(
          "message",
          JSON.stringify({ msg: `Error on checkout.`, variant: "error" })
        );
      }
    });

export const getOrders = () => (dispatch) =>
  axios
    .get(`${REACT_APP_BACKEND_URL}/orders`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      dispatch(loadOrders(res.data.data));
    })
    .catch(function (error) {
      if (error.response.status === 500) {
        console.log(error.response);
      }
    });

export const getOrder = (id) => (dispatch) =>
  axios
    .get(`${REACT_APP_BACKEND_URL}/orders/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      dispatch(loadOrder(res.data.data));
    })
    .catch(function (error) {
      if (error.response.status === 500) {
        console.log(error.response);
      }
    });
