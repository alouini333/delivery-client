import {
  ADD_TO_CART,
  DELETE_FROM_CART,
  CLEAR_CART,
  MODIFY_FROM_CART,
  LOAD_ORDERS,
  LOAD_ORDER
} from '../constants';
import { propEq, reject, append, update, find } from 'ramda';

const initialState = { items: [] };

export default function cart(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      var item = action.payload;
      var found = find(propEq('id', item.id))(state.items);
      item.quantity = found
        ? found.quantity + action.quantity
        : action.quantity;
      return {
        ...state,
        items: found
          ? update(found.id - 1, item, state.items)
          : append(item)(state.items)
      };
    }
    case DELETE_FROM_CART:
      return {
        ...state,
        items: reject(item => propEq('id', action.id)(item))(state.items)
      };
    case MODIFY_FROM_CART:
      return {
        ...state,
        items: update(action.payload.id - 1, action.payload, state.items)
      };
    case LOAD_ORDERS:
      return {
        ...state,
        orders: action.payload
      };
      case LOAD_ORDER:
        return {
          ...state,
          order: action.payload
        };
    case CLEAR_CART:
      return { ...state, items: [] };
    default: {
      return state;
    }
  }
}
