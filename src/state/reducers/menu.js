import { SET_PRODUCTS } from '../constants';

const initialState = {products:[]};

export default function menu(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS: {
      return {...state, products: action.data};
    }
    default: {
      return state;
    }
  }
}
