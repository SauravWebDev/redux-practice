import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function constantReducer(
  state = initialState.constants,
  action
) {
  switch (action.type) {
    case types.SET_CONSTANTS: {
      return {
        ...state,
        difficulty: action.payload.difficulty,
        tag: action.payload.tag,
        language: action.payload.language,
        variableType: action.payload.variableType,
        codeTemplate: action.payload.codeTemplate,
      };
    }
    default:
      return state;
  }
}
