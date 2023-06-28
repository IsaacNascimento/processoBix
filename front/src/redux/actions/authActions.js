import { createAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";

import LogoutUser from "../../shared/hooks/logoutUser";
import { authApi } from "../../utils/api/authApi";
import TokenService from "../../utils/api/base/tokenServicer";
import { publicPaths } from "../../utils/constants";
import { displayError } from "./notificacoesActions";

export const loginRequest = createAction("LOGIN_REQUEST");
export const loginSuccess = createAction("LOGIN_SUCCESS");
export const loginError = createAction("LOGIN_ERROR");

export const isLogadoRequest = createAction("IS_LOGADO_REQUEST");
export const isLogadoSuccess = createAction("IS_LOGADO_SUCCESS");
export const isLogadoError = createAction("IS_LOGADO_ERROR");

export const logoutRequest = createAction("LOGOUT_REQUEST");
export const logoutSuccess = createAction("LOGOUT_SUCCESS");
export const logoutError = createAction("LOGOUT_ERROR");

export const refreshTokenRequest = createAction("REFRESH_TOKEN_REQUEST");
export const refreshTokenSuccess = createAction("REFRESH_TOKEN_SUCCESS");
export const refreshTokenError = createAction("REFRESH_TOKEN_ERROR");

export const checkUserPermissionRequest = createAction("CHECK_USER_PERMISSION_REQUEST");
export const checkUserPermissionSuccess = createAction("CHECK_USER_PERMISSION_SUCCESS");
export const checkUserPermissionError = createAction("CHECK_USER_PERMISSION_ERROR");

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const data = await authApi.login(username, password);
    if (data?.status === 200) {
      delete data?.status;
      TokenService.setUser(data);
      dispatch(loginSuccess(data));
    } else {
      dispatch(loginError(data));
      console.log(data);
    }
  } catch (error) {
    dispatch(loginError(error));
    console.log(error);
  }
};

export const isLogado = () => async (dispatch) => {
  const token = TokenService.getToken();
  const user = jwt_decode(token);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  try {
    dispatch(isLogadoRequest());
    const data = await authApi.isLogado();
    // Se o status code for 401, estiver em rotas privadas e o token não tiver expirado
    // Ou data for undefined dê o Logout no usuário;
    if (
      (data?.status === 401 && !publicPaths && !isExpired) ||
      data === undefined
    ) {
      LogoutUser();
    }
    dispatch(isLogadoSuccess(data));
  } catch (error) {
    dispatch(isLogadoError(error));
    console.log(error);
  }
};

export const logout = (isControllByUser) => async (dispatch) => {
  try {
    dispatch(logoutRequest());
    const data = await authApi.logout();
    LogoutUser(isControllByUser);
    if (data.status === 200) {
      dispatch(logoutSuccess(data));
      LogoutUser(isControllByUser);
    }
    dispatch(logoutSuccess(data));
  } catch (error) {
    dispatch(logoutError(error));
    console.log(error);
  }
};

export const refreshToken = () => async (dispatch) => {
  const { bearerToken } = TokenService.getRefreshToken();
  if (bearerToken) {
    try {
      dispatch(refreshTokenRequest());
      const data = await authApi.refresh(bearerToken);
      const token = data?.access_token?.token;
      if (data.status === 200 && token) {
        delete data?.status;
        dispatch(refreshTokenSuccess(data));
        TokenService.setUser(data);
      }
    } catch (error) {
      console.log(error);

      dispatch(displayError(error));
    }
  }
};

export const checkUserPermission = () => async (dispatch) => {
  const token = TokenService.getToken();

  if (token) {
    try {
      dispatch(checkUserPermissionRequest());
      const data = await authApi.checkUserPermission();
    
      if (data.status === 200 && data?.isLoggin) {
        delete data?.status;
        dispatch(checkUserPermissionSuccess(data));
      } else {
        console.log(data);
        dispatch(displayError(data));
        checkUserPermissionError(data);
      }
    } catch (error) {
      console.log(error);
      dispatch(displayError(error));
      checkUserPermissionError(error);
    }
  }
};


