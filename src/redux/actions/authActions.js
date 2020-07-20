import { refreshTokens } from "../../api/auth";
import {
  SET_TOKEN_EXPIRY,
  AUTHENTICATE_USER,
  ADD_USER,
  LOG_OUT_SUCCESS,
  LOGIN_BEGIN,
  LOGIN_COMPLETE,
  SIGNUP_BEGIN,
  SIGNUP_COMPLETE,
} from "./actionTypes";
import * as auth from "../../api/auth";
import { decode, getCookieByName } from "../../util/util";
import Cookies from "js-cookie";

function setTokenExpiryTrue() {
  return { type: SET_TOKEN_EXPIRY, isExpired: true };
}
function setTokenExpiryFalse() {
  return { type: SET_TOKEN_EXPIRY, isExpired: false };
}

export function refreshToken() {
  return function (dispatch) {
    setTokenExpiryTrue();
    return refreshTokens()
      .then((res) => {
        if (res.error) {
          let err = new Error();
          err.msg = "Error in refresh token";
          throw err;
        } else {
          dispatch(setTokenExpiryFalse());
        }
      })
      .catch((e) => {
        console.log(e);
        let err = new Error();
        err.msg = "Error in refresh token";
        throw err;
      });
  };
}

export function authenticateUser(userId) {
  return { type: AUTHENTICATE_USER, userId };
}

export function addUser(user) {
  return { type: ADD_USER, user };
}

function loginBegin() {
  return { type: LOGIN_BEGIN };
}
function loginComplete() {
  return { type: LOGIN_COMPLETE };
}
export function login(email, password) {
  return function (dispatch) {
    dispatch(loginBegin());
    return auth
      .logIn(email, password)
      .then(({ error }) => {
        if (!error) {
          let userData = decode(getCookieByName("ac-token"));
          dispatch(authenticateUser(userData.id));
          dispatch(addUser(userData));
        } else {
          throw error;
        }
      })
      .catch((error) => {
        dispatch(loginComplete());
        throw error;
      });
  };
}

export function logout() {
  Cookies.remove("ac-token", { path: "" });
  return { type: LOG_OUT_SUCCESS };
}

function singupBegin() {
  return { type: SIGNUP_BEGIN };
}

function singupComplete() {
  return { type: SIGNUP_COMPLETE };
}
export function signup(firsName, lastName, email, password) {
  return function (dispatch) {
    dispatch(singupBegin());
    return auth
      .signup(firsName, lastName, email, password)
      .then(({ error }) => {
        if (!error) {
          dispatch(singupComplete());
        } else {
          throw error;
        }
      })
      .catch((error) => {
        dispatch(singupComplete());
        throw error;
      });
  };
}
