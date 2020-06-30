import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import reducer from "./state/reducers";
import thunk from "redux-thunk";

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk, createLogger({ collapsed: true })))
);

export default store;
