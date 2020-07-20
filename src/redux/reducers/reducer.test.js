import reducer from "./index";
import * as actionsTypes from "../actions/actionTypes";
import initialState from "./initialState";
describe("Reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it("load all problems begin", () => {
    expect(
      reducer(initialState, { type: actionsTypes.PROBLEMS_LOADED_BEGIN })
    ).toEqual({
      ...initialState,
      ["apiCallsInProgress"]: {
        ...initialState.apiCallsInProgress,
        getAllProblems: true,
      },
    });
  });
  it("load all problems complete", () => {
    expect(
      reducer(initialState, { type: actionsTypes.PROBLEMS_LOADED_COMPLETE })
    ).toEqual({
      ...initialState,
    });
  });
});
