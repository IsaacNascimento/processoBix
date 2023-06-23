import axios from "axios";
import { API_LOCALHOST } from "../../constants";
import TokenService from "./tokenServicer";

export const defaultParams = () => {
  const token = TokenService.getSession();

  return {
    baseURL: API_LOCALHOST,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
};

export default axios;
