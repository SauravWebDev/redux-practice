import {
  PROBLEMS_BY_SLUG_LOADED_SUCCESS,
  ADD_PROBLEM_IN_PROBLEMS_BY_SLUG_SUCCESS,
} from "../actions/actionTypes";
import initialState from "./initialState";

export default function problemBySlug(
  state = initialState.problemBySlug,
  action
) {
  switch (action.type) {
    case PROBLEMS_BY_SLUG_LOADED_SUCCESS: {
      return { ...state, ...action.payload };
    }
    case ADD_PROBLEM_IN_PROBLEMS_BY_SLUG_SUCCESS: {
      return { ...state, [action.payload.slug]: action.payload.id };
    }
    default: {
      return state;
    }
  }
}
