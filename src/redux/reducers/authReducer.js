import { AUTHENTICATE_USER, SET_TOKEN_EXPIRY } from "../actions/actionTypes";
import initialState from "./initialState";
export default function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    case SET_TOKEN_EXPIRY: {
      return { ...state, tokenExpired: action.isExpired };
    }
    case AUTHENTICATE_USER: {
      return {
        ...state,
        tokenExpired: false,
        userId: action.userId,
        isAuthenticated: true,
      };
    }
    default: {
      return state;
    }
  }
}
