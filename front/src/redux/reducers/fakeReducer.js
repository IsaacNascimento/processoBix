import {
  fetchJsonPlaceHolderRequest,
  fetchJsonPlaceHolderSuccess,
  fetchJsonPlaceHolderError,
} from "../actions/fakeActions";

const defaultState = {
  items: [],
  isFetching: false,
  error: null,
};

const jsonplaceholderReducer = (state = defaultState, action) => {
  switch (action.type) {
    case fetchJsonPlaceHolderRequest?.type:
      return (state = {
        ...state,
        items: null,
        isFetching: true,
        error: null,
      });
    case fetchJsonPlaceHolderSuccess?.type:
      return (state = {
        ...state,
        items: action.payload,
        isFetching: false,
        error: null,
      });
    case fetchJsonPlaceHolderError?.type:
      return (state = {
        ...state,
        items: null,
        isFetching: false,
        error: action.payload,
      });
    default:
      return state;
  }
};

export default jsonplaceholderReducer;
