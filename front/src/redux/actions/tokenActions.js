import { createAction } from "@reduxjs/toolkit";
export const getTokenFromApi = createAction("GET_TOKEN_FROM_API");

export const getToken = (token) => async (dispatch) => {
  try {
    dispatch(getTokenFromApi(token));
  } catch (error) {
    console.log(error);
  }
};
