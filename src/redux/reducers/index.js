import { combineReducers } from "redux";
import { LOG_OUT_SUCCESS } from "../actions/actionTypes";
import problems from "./problemsReducer";
import problemById from "./problemsByIdReducer";
import problemBySlug from "./problemsBySlugReducer";
import auth from "./authReducer";
import userDetailsById from "./userReducer";
import apiCallsInProgress from "./apiStatusReducer";
import testCases from "./testCasesReducer";
import constants from "./constantReducer";
const rootReducer = function (state, action) {
  if (action.type === LOG_OUT_SUCCESS) {
    state = undefined;
  }

  return combineReducers({
    problems,
    problemById,
    problemBySlug,
    apiCallsInProgress,
    auth,
    userDetailsById,
    testCases,
    constants,
  })(state, action);
};

export default rootReducer;
