import iniitialState from "./initialState";
import {
  ADD_TEST_CASE_SUCCESS,
  UPDATE_TEST_CASE_SUCCESS,
  DELETE_TEST_CASE_SUCCESS,
} from "../actions/actionTypes";

export default function (state = iniitialState.testCases, action) {
  switch (action.type) {
    case ADD_TEST_CASE_SUCCESS: {
      return { ...state, [action.payload.id]: action.payload };
    }
    case UPDATE_TEST_CASE_SUCCESS: {
      return { ...state, [action.payload.id]: action.payload };
    }
    case DELETE_TEST_CASE_SUCCESS: {
      let newState = { ...state };
      delete newState[action.id];
      return newState;
    }
    default: {
      return state;
    }
  }
}
