import { API_LOCALHOST } from "../constants";
import axiosInstance from "./base/axiosInstance";
import TokenService from "./base/tokenServicer";

export const authApi = {
  // retornar status e de acordo com a resposta tomar as
  login: async (username, password) => {
    const body = {username: username, password: password}
    let status;
    return fetch(`${API_LOCALHOST}/login`, {
      body: JSON.stringify(body),
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
  checkUserPermission: async () => {
    return await axiosInstance("user/permission", { method: "GET" })
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;
          return {
            email: data?.email,
            id: data?.id,
            isAdmin: data?.isAdmin,
            username: data?.username,
            status: response.status,
            isLoggin: true,
          }
        }

        const data = response.data;
        return {
          data,
          message: data?.detail,
          status: response.status,
          isLoggin: false,
        }
      })
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
    const body = { refresh: refreshToken };
    const separeted = body.refresh.split(' ')
    
    let status;
    return fetch(`${API_LOCALHOST}/token/refresh`, {
      method: "POST",
      body: JSON.stringify({refresh: separeted[1]}),
      headers: {
        "Content-Type": "application/json",
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
