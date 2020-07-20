import fetchMock from "fetch-mock-jest";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import initialState from "../reducers/initialState";
import * as actionTypes from "./actionTypes";
const middlewares = [thunk];
import * as problemsAction from "./problemsAction";
const mockStore = configureMockStore(middlewares);

const getAllProblemsApiMock = require("../mock/getAllProblemsApi.json");
const problemSourceCodeApi = require("../mock/problemSourceCodeApi.json");
const constantStateMock = require("../mock/constantState.json");
const problemByIdStateMock = require("../mock/problemByIdState.json");
const problemBySlugStateMock = require("../mock/problemBySlugState.json");
const problemsStateMock = require("../mock/problemsState.json");
const problemByIdStateForUpdateMock = require("../mock/problemByIdCreateUpdateState.json");

const problemTryCodeApiMock = require("../mock/tryCodeApi.json");
const problemByIdStateForTrycodeMock = require("../mock/problemByIdForCodeTryState.json");

describe("actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("getAllProblems Action with  query params constants=true", () => {
    fetchMock.getOnce(
      "http://localhost:8081/getAllProblems/?constants=true",
      getAllProblemsApiMock
    );
    const store = mockStore(initialState);
    const expectedActions = [
      { type: actionTypes.PROBLEMS_LOADED_BEGIN },
      { type: actionTypes.SET_CONSTANTS, payload: constantStateMock },
      {
        type: actionTypes.PROBLEMS_BY_ID_LOADED_SUCCESS,
        payload: problemByIdStateMock,
      },
      {
        type: actionTypes.PROBLEMS_BY_SLUG_LOADED_SUCCESS,
        payload: problemBySlugStateMock,
      },
      {
        type: actionTypes.PROBLEMS_LOADED_SUCCESS,
        payload: problemsStateMock,
      },
      {
        type: actionTypes.PROBLEMS_LOADED_COMPLETE,
      },
    ];
    return store
      .dispatch(problemsAction.getAllProblems({ constants: true }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it("get problem for update with query params constant=true , getAllProblems=true", () => {
    fetchMock.getOnce(
      "http://localhost:8081/problem/sourceCode/kth_smallest_element_in_a_sorted_matrix?constants=true&getAllProblems=true",
      problemSourceCodeApi
    );
    const store = mockStore(initialState);
    const expectedActions = [
      { type: actionTypes.LOAD_CREATE_UPDATE_PAGE_BEGIN },
      { type: actionTypes.SET_CONSTANTS, payload: constantStateMock },
      {
        type: actionTypes.PROBLEMS_BY_ID_LOADED_SUCCESS,
        payload: problemByIdStateForUpdateMock,
      },
      {
        type: actionTypes.PROBLEMS_BY_SLUG_LOADED_SUCCESS,
        payload: problemBySlugStateMock,
      },
      {
        type: actionTypes.PROBLEMS_LOADED_SUCCESS,
        payload: problemsStateMock,
      },
      {
        type: actionTypes.LOAD_CREATE_UPDATE_PAGE_COMPLETE,
      },
    ];
    return store
      .dispatch(
        problemsAction.getProblemForUpdate({
          slug: "kth_smallest_element_in_a_sorted_matrix",
          params: { constants: true, getAllProblems: true },
        })
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it("get problem for trycode with query params constant=true , getAllProblems=true", () => {
    fetchMock.getOnce(
      "http://localhost:8081/problem/try/kth_smallest_element_in_a_sorted_matrix?constants=true&getAllProblems=true",
      problemTryCodeApiMock
    );
    const store = mockStore(initialState);
    const expectedActions = [
      { type: actionTypes.LOAD_TRY_CODE_BEGIN },
      { type: actionTypes.SET_CONSTANTS, payload: constantStateMock },
      {
        type: actionTypes.PROBLEMS_BY_ID_LOADED_SUCCESS,
        payload: problemByIdStateForTrycodeMock,
      },
      {
        type: actionTypes.PROBLEMS_BY_SLUG_LOADED_SUCCESS,
        payload: problemBySlugStateMock,
      },
      {
        type: actionTypes.PROBLEMS_LOADED_SUCCESS,
        payload: problemsStateMock,
      },
      {
        type: actionTypes.LOAD_TRY_CODE_COMPLETE,
      },
    ];
    return store
      .dispatch(
        problemsAction.getProblemForTryCode({
          slug: "kth_smallest_element_in_a_sorted_matrix",
          params: { constants: true, getAllProblems: true },
        })
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
