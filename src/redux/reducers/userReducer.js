import { ADD_USER } from "../actions/actionTypes";
import iniitialState from "./initialState";
export default function userReducer(
  state = iniitialState.userDetailsById,
  action
) {
  switch (action.type) {
    case ADD_USER: {
      return { ...state, [action.user.id]: action.user };
    }
    default: {
      return state;
    }
  }
}
