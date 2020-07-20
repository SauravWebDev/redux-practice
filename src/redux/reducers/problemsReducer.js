import {
  PROBLEMS_LOADED_SUCCESS,
  ADD_PROBLEM_IN_PROBLEMS_SUCCESS,
} from "../actions/actionTypes";
import initialState from "./initialState";

export default function problemReducer(state = initialState.problems, action) {
  switch (action.type) {
    case PROBLEMS_LOADED_SUCCESS: {
      return [...state, ...action.payload];
    }
    case ADD_PROBLEM_IN_PROBLEMS_SUCCESS: {
      return [action.payload, ...state];
    }
    default:
      return state;
  }
}
