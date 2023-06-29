import {
  fetchFuncionarioRequest,
  fetchFuncionarioSuccess,
  fetchFuncionarioError,
  createFuncionarioRequest,
  createFuncionarioSuccess,
  createFuncionarioError,
  deleteFuncionarioRequest,
  deleteFuncionarioSuccess,
  deleteFuncionarioError,
  getFuncionarioByIdRequest,
  getFuncionarioByIdSuccess,
  getFuncionarioByIdError,
  updateFuncionarioRequest,
  updateFuncionarioSuccess,
  updateFuncionarioError,
  clearFuncionarioById,
} from "../actions/funcionarioActions";

const defaultState = {
  funcionarios: [],
  funcionario: null,
  isFetching: false,
  isUpdating: false,
  error: null,
};

const funcionarioReducer = (state = defaultState, action) => {
  const payload = action?.payload;

  switch (action.type) {

    case fetchFuncionarioRequest?.type:
      return (state = {
        ...state,
        funcionarios: null,
        isFetching: true,
        error: null,
      });
    case fetchFuncionarioSuccess?.type:
      return (state = {
        ...state,
        funcionarios: payload,
        isFetching: false,
        error: null,
      });
    case fetchFuncionarioError?.type:
      return (state = {
        ...state,
        funcionarios: null,
        isFetching: false,
        error: payload,
      });



    case createFuncionarioRequest?.type:
      return (state = {
        ...state,
        isUpdating: true,
        error: null,
      });
    case createFuncionarioSuccess?.type:
      return (state = {
        ...state,
        isUpdating: false,
        error: null,
      });
    case createFuncionarioError?.type:
      return (state = {
        ...state,
        isUpdating: false,
        error: payload,
      });


    case deleteFuncionarioRequest?.type:
      return (state = {
        ...state,
        isUpdating: true,
        error: null,
      });
    case deleteFuncionarioSuccess?.type:
      return (state = {
        ...state,
        isUpdating: false,
        error: null,
      });
    case deleteFuncionarioError?.type:
      return (state = {
        ...state,
        isUpdating: false,
        error: payload,
      });


    case getFuncionarioByIdRequest?.type:
      return (state = {
        ...state,
        isFetching: true,
        funcionario: null,
        error: null,
      });
    case getFuncionarioByIdSuccess?.type:
      return (state = {
        ...state,
        isFetching: false,
        funcionario: payload,
        error: null,
      });
    case getFuncionarioByIdError?.type:
      return (state = {
        ...state,
        error: payload,
        isFetching: false,
        funcionario: null,
      });


    case updateFuncionarioRequest?.type:
      return (state = {
        ...state,
        isUpdating: true,
        error: null,
      });
    case updateFuncionarioSuccess?.type:
      return (state = {
        ...state,
        funcionario: payload,
        isUpdating: false,
        error: null,
      });
    case updateFuncionarioError?.type:
      return (state = {
        ...state,
        isUpdating: false,
        error: payload,
      });


    case clearFuncionarioById?.type:
      return (state = {
        ...state,
        funcionario: null,
      });
    default:
      return state;
  }
};

export default funcionarioReducer;
