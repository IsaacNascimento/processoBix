import {
  getSelectedItemIdRequest,
  getSelectedItemIdSuccess,
  getSelectedItemIdError,
} from "../actions/tableBaseActions";

const defaultState = {
  itemById: {},
  isFetching: false,
  error: null,
};

const tableBaseReducer = (state = defaultState, action) => {
  // console.log("type", getSelectedItemIdSuccess.type);
  switch (action.type) {
    case getSelectedItemIdRequest?.type:
      return (state = {
        itemById: null,
        isFetching: true,
        error: null,
      });
    case getSelectedItemIdSuccess.type:
      return (state = {
        itemById: action.payload,
        isFetching: false,
        error: null,
      });
    case getSelectedItemIdError?.type:
      return (state = {
        ...state,
        itemById: null,
        isFetching: false,
        error: action.payload,
      });
    default:
      return state;
  }
};

export default tableBaseReducer;
