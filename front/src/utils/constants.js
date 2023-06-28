export const JWT = "BixDashboard";
export const USERNAME = "USERNAME";

export const oneMinute = 60 * 1000;

export const API_LOCALHOST = "http://127.0.0.1:8000/api";

let path = window.location.pathname;
export const publicPaths = path === "/" && path === "/login";
