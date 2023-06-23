import { API_LOCALHOST } from "../constants";
import axiosInstance from "./base/axiosInstance";
import TokenService from "./base/tokenServicer";

export const authApi = {
  // retornar status e de acordo com a resposta tomar as
  login: async (username, password) => {
    let status;
    return fetch(`${API_LOCALHOST}auth/login`, {
      body: `username=${username}&password=${password}`,
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((response) => {
        status = response.status;
        return response.json();
      })
      .then((data) => {
        const value = { ...data, status: status };
        return value;
      })
      .catch((error) => {
        return error;
      });
  },
  isLogado: async () => {
    return await axiosInstance("auth/logado", { method: "GET" })
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
          return {
            response: response,
            expiresIn: response?.data?.vida_token,
            isLoggin: response?.data?.isLoggin,
            status: response?.status,
            message: response?.statusText,
          };
        }

        const res = response?.response;
        return {
          res,
          message: res?.data?.detail?.mensagem,
          status: res?.status,
          isLoggin: false,
        };
      })
      .catch((reason) => {
        if (reason?.response?.status === 401) {
          return {
            response: reason?.response,
            isLoggin: reason?.response?.data?.detail?.isLoggin,
            status: reason?.response?.status,
            message: reason?.response?.statusText,
          };
        }
      });
  },

  logout: async () => {
    const token = TokenService.getToken();
    return fetch(`${API_LOCALHOST}auth/logout`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        // console.log("response api: ", response);
        return {
          response,
          status: response?.status,
        };
      })
      .catch((error) => {
        if (error?.response?.status !== 200) {
          return {
            response: error?.response,
            status: error?.response?.status,
          };
        }
      });
  },

  refresh: async (refreshToken) => {
    let status;
    return fetch(`${API_LOCALHOST}auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: refreshToken,
      },
    })
      .then((response) => {
        status = response.status;
        return response.json();
      })
      .then((data) => {
        if (status === 200) {
          return {
            data,
            status,
          };
        }
        return data;
      })
      .catch((error) => {
        return {
          error,
          response: error?.response,
          status: error?.response?.status,
        };
      });
  },
};
