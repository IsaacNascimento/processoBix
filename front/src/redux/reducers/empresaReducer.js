import {
  fetchEmpresaRequest,
  fetchEmpresaSuccess,
  fetchEmpresaError,
  createEmpresaRequest,
  createEmpresaSuccess,
  createEmpresaError,
  deleteEmpresaRequest,
  deleteEmpresaSuccess,
  deleteEmpresaError,
  getEmpresaByIdRequest,
  getEmpresaByIdSuccess,
  getEmpresaByIdError,
  updateEmpresaRequest,
  updateEmpresaSuccess,
  updateEmpresaError,
  clearEmpresaById,
} from "../actions/empresaActions";

const defaultState = {
  empresas: [],
  empresa: null,
  isFetching: false,
  isUpdating: false,
  error: null,
};

const empresaReducer = (state = defaultState, action) => {
  const payload = action?.payload;

  switch (action.type) {

    case fetchEmpresaRequest?.type:
      return (state = {
        ...state,
        empresas: null,
        isFetching: true,
        error: null,
      });
    case fetchEmpresaSuccess?.type:
      return (state = {
        ...state,
        empresas: payload,
        isFetching: false,
        error: null,
      });
    case fetchEmpresaError?.type:
      return (state = {
        ...state,
        empresas: null,
        isFetching: false,
        error: payload,
      });



    case createEmpresaRequest?.type:
      return (state = {
        ...state,
        isUpdating: true,
        error: null,
      });
    case createEmpresaSuccess?.type:
      return (state = {
        ...state,
        isUpdating: false,
        error: null,
      });
    case createEmpresaError?.type:
      return (state = {
        ...state,
        isUpdating: false,
        error: payload,
      });


    case deleteEmpresaRequest?.type:
      return (state = {
        ...state,
        isUpdating: true,
        error: null,
      });
    case deleteEmpresaSuccess?.type:
      return (state = {
        ...state,
        isUpdating: false,
        error: null,
      });
    case deleteEmpresaError?.type:
      return (state = {
        ...state,
        isUpdating: false,
        error: payload,
      });


    case getEmpresaByIdRequest?.type:
      return (state = {
        ...state,
        isFetching: true,
        empresa: null,
        error: null,
      });
    case getEmpresaByIdSuccess?.type:
      return (state = {
        ...state,
        isFetching: false,
        empresa: payload,
        error: null,
      });
    case getEmpresaByIdError?.type:
      return (state = {
        ...state,
        error: payload,
        isFetching: false,
        empresa: null,
      });


    case updateEmpresaRequest?.type:
      return (state = {
        ...state,
        isUpdating: true,
        error: null,
      });
    case updateEmpresaSuccess?.type:
      return (state = {
        ...state,
        empresa: payload,
        isUpdating: false,
        error: null,
      });
    case updateEmpresaError?.type:
      return (state = {
        ...state,
        isUpdating: false,
        error: payload,
      });


    case clearEmpresaById?.type:
      return (state = {
        ...state,
        empresa: null,
      });
    default:
      return state;
  }
};

export default empresaReducer;
