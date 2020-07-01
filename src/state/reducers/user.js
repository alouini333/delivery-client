import { LOGIN_REQUEST, LOGOUT_REQUEST } from '../constants';

const initialState = JSON.parse(localStorage.getItem('user'));

export default function user(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return action.payload;
    }
    case LOGOUT_REQUEST:
    default: {
      return null;
    }
  }
}
