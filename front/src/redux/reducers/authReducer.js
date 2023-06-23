import {
  loginRequest,
  loginSuccess,
  loginError,
  isLogadoRequest,
  isLogadoSuccess,
  isLogadoError,
  logoutRequest,
  logoutSuccess,
  logoutError,
} from "../actions/authActions";

const defaultState = {
  user: null,
  isFetching: false,
  isLoggin: false,
  error: null,
};

const loginReducer = (state = defaultState, action) => {
  const payload = action?.payload;
  // console.log("payload: ", payload);
  const isToken = payload?.access_token;
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
    case isLogadoRequest?.type:
      return (state = {
        ...state,
        user: payload,
        isFetching: true,
      });
    case isLogadoSuccess?.type:
      return (state = {
        ...state,
        user: payload,
        isFetching: false,
        isLoggin: payload?.isLoggin,
      });
    case isLogadoError?.type:
      return (state = {
        ...state,
        error: action,
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
    default:
      return state;
  }
};

export default loginReducer;
