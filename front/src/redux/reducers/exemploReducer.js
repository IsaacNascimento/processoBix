import {
  fetchExemploRequest,
  fetchExemploSuccess,
  fetchExemploError,
  createExemploRequest,
  createExemploSuccess,
  createExemploError,
  deleteExemploRequest,
  deleteExemploSuccess,
  deleteExemploError,
  getExemploByIdRequest,
  getExemploByIdSuccess,
  getExemploByIdError,
  updateExemploRequest,
  updateExemploSuccess,
  updateExemploError,
  clearExemploById,
} from "../actions/exemploActions";

const defaultState = {
  exemplos: [],
  exemplo: null,
  isFetching: false,
  isUpdating: false,
  error: null,
};

const exemploReducer = (state = defaultState, action) => {
  const payload = action?.payload;
  switch (action.type) {
    case fetchExemploRequest?.type:
      return (state = {
        ...state,
        exemplos: null,
        isFetching: true,
        error: null,
      });
    case fetchExemploSuccess?.type:
      return (state = {
        ...state,
        exemplos: payload,
        isFetching: false,
        error: null,
      });
    case fetchExemploError?.type:
      return (state = {
        ...state,
        exemplos: null,
        isFetching: false,
        error: payload,
      });
    case createExemploRequest?.type:
      return (state = {
        ...state,
        isUpdating: true,
        error: null,
      });
    case createExemploSuccess?.type:
      return (state = {
        ...state,
        isUpdating: false,
        error: null,
      });
    case createExemploError?.type:
      return (state = {
        ...state,
        isUpdating: false,
        error: payload,
      });
    case deleteExemploRequest?.type:
      return (state = {
        ...state,
        isUpdating: true,
        error: null,
      });
    case deleteExemploSuccess?.type:
      return (state = {
        ...state,
        isUpdating: false,
        error: null,
      });
    case deleteExemploError?.type:
      return (state = {
        ...state,
        isUpdating: false,
        error: payload,
      });
    case getExemploByIdRequest?.type:
      return (state = {
        ...state,
        isFetching: true,
        exemplo: null,
        error: null,
      });
    case getExemploByIdSuccess?.type:
      return (state = {
        ...state,
        isFetching: false,
        exemplo: payload,
        error: null,
      });
    case getExemploByIdError?.type:
      return (state = {
        ...state,
        error: payload,
        isFetching: false,
        exemplo: null,
      });
    case updateExemploRequest?.type:
      return (state = {
        ...state,
        isUpdating: true,
        error: null,
      });
    case updateExemploSuccess?.type:
      return (state = {
        ...state,
        exemplo: payload,
        isUpdating: false,
        error: null,
      });
    case updateExemploError?.type:
      return (state = {
        ...state,
        isUpdating: false,
        error: payload,
      });
    case clearExemploById?.type:
      return (state = {
        ...state,
        exemplo: null,
      });
    default:
      return state;
  }
};

export default exemploReducer;
