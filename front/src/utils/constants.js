export const JWT = "BixDashboard";
export const USERNAME = "USERNAME";

export const oneMinute = 60 * 1000;

export const API_LOCALHOST = "http://localhost:8000/api/v1/";

let path = window.location.pathname;
export const publicPaths = path === "/" && path === "/login";
