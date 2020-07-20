import {
  PROBLEMS_LOADED_BEGIN,
  PROBLEMS_LOADED_COMPLETE,
  ADD_UPDATE_PROBLEM_COMPLETE,
  ADD_UPDATE_PROBLEM_BEGIN,
  LOGIN_BEGIN,
  LOGIN_COMPLETE,
  LOG_OUT_BEGIN,
  LOG_OUT_COMPLETE,
  SIGNUP_BEGIN,
  SIGNUP_COMPLETE,
  ADD_TEST_CASE_BEGIN,
  ADD_TEST_CASE_COMPLETE,
  UPDATE_TEST_CASE_BEGIN,
  UPDATE_TEST_CASE_COMPLETE,
  DELETE_TEST_CASE_BEGIN,
  DELETE_TEST_CASE_COMPLETE,
  LOAD_TRY_CODE_BEGIN,
  LOAD_TRY_CODE_COMPLETE,
  LOAD_CREATE_UPDATE_PAGE_BEGIN,
  LOAD_CREATE_UPDATE_PAGE_COMPLETE,
} from "../actions/actionTypes";

import initialState from "./initialState";

export default function apiCallStatusReducer(
  state = initialState.apiCallsInProgress,
  action
) {
  switch (action.type) {
    case PROBLEMS_LOADED_BEGIN: {
      return { ...state, getAllProblems: true };
    }
    case PROBLEMS_LOADED_COMPLETE: {
      return { ...state, getAllProblems: false };
    }
    case ADD_UPDATE_PROBLEM_BEGIN: {
      return { ...state, updateOrCreate: true };
    }
    case ADD_UPDATE_PROBLEM_COMPLETE: {
      return { ...state, updateOrCreate: false };
    }
    case LOGIN_BEGIN: {
      return { ...state, logIn: true };
    }
    case LOGIN_COMPLETE: {
      return { ...state, logIn: false };
    }
    case LOG_OUT_BEGIN: {
      return { ...state, logout: true };
    }
    case LOG_OUT_COMPLETE: {
      return { ...state, logout: false };
    }
    case SIGNUP_BEGIN: {
      return { ...state, signup: true };
    }
    case SIGNUP_COMPLETE: {
      return { ...state, signup: false };
    }
    case ADD_TEST_CASE_BEGIN: {
      return { ...state, testCase: true };
    }
    case ADD_TEST_CASE_COMPLETE: {
      return { ...state, testCase: false };
    }
    case UPDATE_TEST_CASE_BEGIN: {
      return { ...state, testCase: true };
    }
    case UPDATE_TEST_CASE_COMPLETE: {
      return { ...state, testCase: false };
    }
    case DELETE_TEST_CASE_BEGIN: {
      return { ...state, testCase: true };
    }
    case DELETE_TEST_CASE_COMPLETE: {
      return { ...state, testCase: false };
    }
    case LOAD_TRY_CODE_BEGIN: {
      return { ...state, tryCode: true };
    }
    case LOAD_TRY_CODE_COMPLETE: {
      return { ...state, tryCode: false };
    }
    case LOAD_CREATE_UPDATE_PAGE_BEGIN: {
      return { ...state, updateOrCreate: true };
    }
    case LOAD_CREATE_UPDATE_PAGE_COMPLETE: {
      return { ...state, updateOrCreate: false };
    }
    default:
      return state;
  }
}
