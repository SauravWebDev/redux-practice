import {
  PROBLEMS_BY_ID_LOADED_SUCCESS,
  UPDATE_PROBLEM_IN_PROBLEM_BY_ID_SUCCESS,
  ADD_PROBLEM_IN_PROBLEMS_BY_ID_SUCCESS,
  UPDATE_PROBLEM_SOURCE_CODE_SUCCESS,
  UPDATE_PROBLEM_META_DATA_SUCCESS,
} from "../actions/actionTypes";
import initialState from "./initialState";

export default function problemById(state = initialState.problemById, action) {
  switch (action.type) {
    case PROBLEMS_BY_ID_LOADED_SUCCESS: {
      return { ...action, ...action.payload };
    }
    case UPDATE_PROBLEM_IN_PROBLEM_BY_ID_SUCCESS: {
      return { ...state, [action.payload.id]: action.payload };
    }
    case ADD_PROBLEM_IN_PROBLEMS_BY_ID_SUCCESS: {
      return { ...state, [action.payload.id]: action.payload };
    }
    case UPDATE_PROBLEM_SOURCE_CODE_SUCCESS: {
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          code: action.payload.code,
        },
      };
    }
    case UPDATE_PROBLEM_META_DATA_SUCCESS: {
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          meta_data: action.payload.meta_data,
        },
      };
    }
    default: {
      return state;
    }
  }
}
