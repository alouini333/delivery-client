import { LOAD_CONFIGURATION } from '../constants';

const initialState = null;

export default function config(state = initialState, action) {
  switch (action.type) {
    case LOAD_CONFIGURATION: {
      return action.data;
    }
    default: {
      return state;
    }
  }
}
