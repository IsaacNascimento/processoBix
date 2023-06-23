import { createAction } from "@reduxjs/toolkit";
import { exemploApi } from "../../utils/api/exemploApi";
import { displayError, displaySuccess } from "./notificacoesActions";

export const getExemploByIdRequest = createAction("GET_EXEMPLO_BY_ID_REQUEST");
export const getExemploByIdSuccess = createAction("GET_EXEMPLO_BY_ID_SUCCESS");
export const getExemploByIdError = createAction("GET_EXEMPLO_BY_ID_ERROR");

export const fetchExemploRequest = createAction("FETCH_EXEMPLO_REQUEST");
export const fetchExemploSuccess = createAction("FETCH_EXEMPLO_SUCCESS");
export const fetchExemploError = createAction("FETCH_EXEMPLO_ERROR");

export const createExemploRequest = createAction("CREATE_EXEMPLO_REQUEST");
export const createExemploSuccess = createAction("CREATE_EXEMPLO_SUCCESS");
export const createExemploError = createAction("CREATE_EXEMPLO_ERROR");

export const updateExemploRequest = createAction("UPDATE_EXEMPLO_REQUEST");
export const updateExemploSuccess = createAction("UPDATE_EXEMPLO_SUCCESS");
export const updateExemploError = createAction("UPDATE_EXEMPLO_ERROR");

export const deleteExemploRequest = createAction("DELETE_EXEMPLO_REQUEST");
export const deleteExemploSuccess = createAction("DELETE_EXEMPLO_SUCCESS");
export const deleteExemploError = createAction("DELETE_EXEMPLO_ERROR");

export const clearExemploById = createAction("CLEAR_EXEMPLO_BY_ID");

export const fetchExemplos = () => async (dispatch) => {
  try {
    dispatch(fetchExemploRequest());
    const data = await exemploApi.fetchAll();
    dispatch(fetchExemploSuccess(data));
  } catch (error) {
    dispatch(fetchExemploError(error));
    console.log(error);
  }
};

export const getExemploById = (id) => async (dispatch) => {
  try {
    dispatch(getExemploByIdRequest());
    const data = await exemploApi.getExemplo(id);
    dispatch(getExemploByIdSuccess(data));
  } catch (error) {
    dispatch(getExemploByIdError(error));
    console.log(error);
  }
};

export const createExemplo = (form) => async (dispatch) => {
  try {
    dispatch(createExemploRequest());
    const data = await exemploApi.createExemplo(form);
    if (data?.status === 201) {
      dispatch(displaySuccess("Exemplo incluído com sucesso!"));
    } else {
      dispatch(displayError(`Ocorreu um erro ${data} ao criar exemplo`));
    }
    dispatch(createExemploSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(displayError(`Ocorreu um erro ${error}`));
    dispatch(createExemploError(error));
  }
};

export const updateExemplo = (data) => async (dispatch) => {
  try {
    dispatch(updateExemploRequest());
    const value = await exemploApi.updateExemplo(data);
    if (value?.status === 202) {
      dispatch(displaySuccess("Exemplo editado com sucesso!"));
    } else {
      dispatch(
        displayError(
          `Ocorreu um erro: "${value?.data}" ao atualizar exemplo ${data?.id}`
        )
      );
    }
    dispatch(updateExemploSuccess(value));
  } catch (error) {
    dispatch(displayError(error));
    dispatch(updateExemploError(error));
    console.log(error);
  }
};

export const deleteExemplo = (id) => async (dispatch) => {
  try {
    dispatch(deleteExemploRequest());
    const data = await exemploApi.deleteExemplo(id);
    if (data?.status === 204) {
      dispatch(displaySuccess("Exemplo deletado com sucesso!"));
    } else {
      dispatch(
        displayError(`Ocorreu um erro ${data} ao deletar o exemplo ${id}`)
      );
    }
    dispatch(deleteExemploSuccess(data));
  } catch (error) {
    dispatch(displayError(error));
    dispatch(deleteExemploError(error));
    console.log(error);
  }
};
