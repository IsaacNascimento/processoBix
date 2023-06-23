/* eslint-disable */
import { get } from "./base";
import axiosInstance from "./base/axiosInstance";

export default {
  fetchAll: () => get("https://jsonplaceholder.typicode.com/posts"),
  listAll: () => axiosInstance("posts", { method: "GET" }),
};
