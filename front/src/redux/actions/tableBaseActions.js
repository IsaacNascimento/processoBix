import { createAction } from "@reduxjs/toolkit";

export const getSelectedItemIdRequest = createAction(
  "GET_SELECTED_ITEM_BY_ID_REQUEST"
);
export const getSelectedItemIdSuccess = createAction(
  "GET_SELECTED_ITEM_BY_ID_SUCCESS"
);
export const getSelectedItemIdError = createAction(
  "GET_SELECTED_ITEM_BY_ID_ERROR"
);

export const getSelectedItemId = (item) => (dispatch) => {
  //   console.log(item);
  try {
    dispatch(getSelectedItemIdRequest());
    setTimeout(() => {
      dispatch(getSelectedItemIdSuccess(item));
    }, [1000]);
  } catch (error) {
    dispatch(getSelectedItemIdError());
    console.error(error);
  }
};
