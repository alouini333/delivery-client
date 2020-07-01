import { combineReducers } from "redux";
import user from "./user";
import cart from "./cart";
import menu from "./menu";
import config from "./config";

export default combineReducers({
  user,
  cart,
  menu,
  config,
});
