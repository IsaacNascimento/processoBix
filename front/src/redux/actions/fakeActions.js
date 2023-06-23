import { createAction } from "@reduxjs/toolkit";
import fakeApi from "../../utils/api/fakeApi";

export const fetchJsonPlaceHolderRequest = createAction(
  "FETCH_JSON_PLACEHOLDER_REQUEST"
);
export const fetchJsonPlaceHolderSuccess = createAction(
  "FETCH_JSON_PLACEHOLDER_SUCCESS"
);
export const fetchJsonPlaceHolderError = createAction(
  "FETCH_JSON_PLACEHOLDER_ERROR"
);

export const fetchJsonPlaceHolder = () => async (dispatch) => {
  try {
    dispatch(fetchJsonPlaceHolderRequest());

    const { data } = await fakeApi.fetchAll();
    // console.log(data);
    dispatch(fetchJsonPlaceHolderSuccess(data));
  } catch (e) {
    console.log(e);
    dispatch(fetchJsonPlaceHolderError(e));
  }
};
