import { createAction } from "@reduxjs/toolkit";
import { empresaApi } from "../../utils/api/empresaApi";
import { displayError, displaySuccess } from "./notificacoesActions";

export const getEmpresaByIdRequest = createAction("GET_EMPRESA_BY_ID_REQUEST");
export const getEmpresaByIdSuccess = createAction("GET_EMPRESA_BY_ID_SUCCESS");
export const getEmpresaByIdError = createAction("GET_EMPRESA_BY_ID_ERROR");

export const fetchEmpresaRequest = createAction("FETCH_EMPRESA_REQUEST");
export const fetchEmpresaSuccess = createAction("FETCH_EMPRESA_SUCCESS");
export const fetchEmpresaError = createAction("FETCH_EMPRESA_ERROR");

export const createEmpresaRequest = createAction("CREATE_EMPRESA_REQUEST");
export const createEmpresaSuccess = createAction("CREATE_EMPRESA_SUCCESS");
export const createEmpresaError = createAction("CREATE_EMPRESA_ERROR");

export const updateEmpresaRequest = createAction("UPDATE_EMPRESA_REQUEST");
export const updateEmpresaSuccess = createAction("UPDATE_EMPRESA_SUCCESS");
export const updateEmpresaError = createAction("UPDATE_EMPRESA_ERROR");

export const deleteEmpresaRequest = createAction("DELETE_EMPRESA_REQUEST");
export const deleteEmpresaSuccess = createAction("DELETE_EMPRESA_SUCCESS");
export const deleteEmpresaError = createAction("DELETE_EMPRESA_ERROR");

export const clearEmpresaById = createAction("CLEAR_EMPRESA_BY_ID");

export const fetchEmpresa = () => async (dispatch) => {
  try {
    dispatch(fetchEmpresaRequest());
    const data = await empresaApi.fetchAll();
    if (data.status === 200) {
      dispatch(fetchEmpresaSuccess(data?.data));
    } else {
      dispatch(fetchEmpresaError(data));
      console.log(data);
    }
  } catch (error) {
    dispatch(fetchEmpresaError(error));
    console.log(error);
  }
};

export const getEmpresaById = (id) => async (dispatch) => {
  try {
    dispatch(getEmpresaByIdRequest());
    const data = await empresaApi.getEmpresa(id);
    dispatch(getEmpresaByIdSuccess(data));
  } catch (error) {
    dispatch(getEmpresaByIdError(error));
    console.log(error);
  }
};

export const createEmpresa = ({ ...values }) => async (dispatch) => {
  console.log('form', values);
  try {
    dispatch(createEmpresaRequest());
    const data = await empresaApi.createEmpresa(values);
    if (data?.status === 201) {
      dispatch(displaySuccess("Empresa incluída com sucesso!"));
    } else {
      dispatch(displayError(`Ocorreu um erro ${data} ao criar Empresa`));
    }
    dispatch(createEmpresaSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(displayError(`Ocorreu um erro ${error}`));
    dispatch(createEmpresaError(error));
  }
};

export const updateEmpresa = (data) => async (dispatch) => {
  try {
    dispatch(updateEmpresaRequest());
    const value = await empresaApi.updateEmpresa(data);
    if (value?.status === 204) {
      dispatch(displaySuccess("Empresa editada com sucesso!"));
    } else {
      dispatch(
        displayError(
          `Ocorreu um erro: "${value?.data}" ao atualizar Empresa ${data?.id}`
        )
      );
    }
    dispatch(updateEmpresaSuccess(value));
  } catch (error) {
    dispatch(displayError(error));
    dispatch(updateEmpresaError(error));
    console.log(error);
  }
};

export const deleteEmpresa = (id) => async (dispatch) => {
  try {
    dispatch(deleteEmpresaRequest());
    const data = await empresaApi.deleteEmpresa(id);
    if (data?.status === 204) {
      dispatch(displaySuccess("Empresa deletada com sucesso!"));
    } else {
      dispatch(
        displayError(`Ocorreu um erro ${data} ao deletar o Empresa ${id}`)
      );
    }
    dispatch(deleteEmpresaSuccess(data));
  } catch (error) {
    dispatch(displayError(error));
    dispatch(deleteEmpresaError(error));
    console.log(error);
  }
};
