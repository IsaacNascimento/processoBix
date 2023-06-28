import {
  loginRequest,
  loginSuccess,
  loginError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  checkUserPermissionRequest,
  checkUserPermissionSuccess,
  checkUserPermissionError
} from "../actions/authActions";

const defaultState = {
  user: null,
  isFetching: false,
  isLoggin: false,
  error: null,
  isAdmin: null,
};

const loginReducer = (state = defaultState, action) => {
  const payload = action?.payload;
  const isToken = payload?.access;
  switch (action?.type) {
    case loginRequest?.type:
      return (state = {
        ...state,
        user: null,
        isFetching: true,
        isLoggin: false,
        error: null,
      });
    case loginSuccess?.type:
      return (state = {
        ...state,
        user: isToken ? payload : null,
        isFetching: false,
        isLoggin: isToken ? true : false,
        error: isToken ? null : payload?.detail,
      });
    case loginError?.type:
      return (state = {
        ...state,
        user: null,
        isFetching: false,
        isLoggin: false,
        error: payload,
      });
    case logoutRequest?.type:
      return (state = {
        ...state,
        user: null,
        error: null,
        isFetching: true,
        isLoggin: true,
      });
    case logoutSuccess?.type:
      return (state = {
        ...state,
        user: payload,
        isFetching: false,
        isLoggin: false,
      });
    case logoutError?.type:
      return (state = {
        ...state,
        user: null,
        isFetching: false,
        error: payload,
      });

    case checkUserPermissionRequest?.type:
      return (state = {
        ...state,
        isAdmin: payload,
        user: payload,
        isFetching: true,
      });
    case checkUserPermissionSuccess?.type:
      return (state = {
        ...state,
        isAdmin: payload,
        user: payload,
        isFetching: false,
        isLoggin: payload?.isLoggin,
      });
    case checkUserPermissionError?.type:
      return (state = {
        ...state,
        error: action,
      });

    default:
      return state;
  }
};

export default loginReducer;
