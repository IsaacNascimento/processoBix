import { createAction } from "@reduxjs/toolkit";
import { funcionarioApi } from "../../utils/api/funcionarioApi";
import { displayError, displaySuccess } from "./notificacoesActions";

export const getFuncionarioByIdRequest = createAction("GET_FUNCIONARIO_BY_ID_REQUEST");
export const getFuncionarioByIdSuccess = createAction("GET_FUNCIONARIO_BY_ID_SUCCESS");
export const getFuncionarioByIdError = createAction("GET_FUNCIONARIO_BY_ID_ERROR");

export const fetchFuncionarioRequest = createAction("FETCH_FUNCIONARIO_REQUEST");
export const fetchFuncionarioSuccess = createAction("FETCH_FUNCIONARIO_SUCCESS");
export const fetchFuncionarioError = createAction("FETCH_FUNCIONARIO_ERROR");

export const createFuncionarioRequest = createAction("CREATE_FUNCIONARIO_REQUEST");
export const createFuncionarioSuccess = createAction("CREATE_FUNCIONARIO_SUCCESS");
export const createFuncionarioError = createAction("CREATE_FUNCIONARIO_ERROR");

export const updateFuncionarioRequest = createAction("UPDATE_FUNCIONARIO_REQUEST");
export const updateFuncionarioSuccess = createAction("UPDATE_FUNCIONARIO_SUCCESS");
export const updateFuncionarioError = createAction("UPDATE_FUNCIONARIO_ERROR");

export const deleteFuncionarioRequest = createAction("DELETE_FUNCIONARIO_REQUEST");
export const deleteFuncionarioSuccess = createAction("DELETE_FUNCIONARIO_SUCCESS");
export const deleteFuncionarioError = createAction("DELETE_FUNCIONARIO_ERROR");

export const clearFuncionarioById = createAction("CLEAR_FUNCIONARIO_BY_ID");

export const fetchFuncionario = () => async (dispatch) => {
  try {
    dispatch(fetchFuncionarioRequest());
    const data = await funcionarioApi.fetchAll();
    if (data.status === 200) {
      dispatch(fetchFuncionarioSuccess(data?.data));
    } else {
      dispatch(fetchFuncionarioError(data));
      console.log(data);
    }
  } catch (error) {
    dispatch(fetchFuncionarioError(error));
    console.log(error);
  }
};

export const getFuncionarioById = (id) => async (dispatch) => {
  try {
    dispatch(getFuncionarioByIdRequest());
    const data = await funcionarioApi.getFuncionario(id);
    if (data.status === 200) {
      dispatch(getFuncionarioByIdSuccess(data));
    } else {
      dispatch(getFuncionarioByIdError(data));
    }
  } catch (error) {
    dispatch(getFuncionarioByIdError(error));
    console.log(error);
  }
};

export const createFuncionario = ({ ...values }) => async (dispatch) => {
  console.log('form', values);
  try {
    dispatch(createFuncionarioRequest());
    const data = await funcionarioApi.createFuncionario(values);
    if (data?.status === 201) {
      dispatch(displaySuccess("Funcionário incluído com sucesso!"));
      dispatch(createFuncionarioSuccess(data));
    } else {
      dispatch(displayError(`Ocorreu um erro ${data} ao criar Funcionário`));
      dispatch(createFuncionarioError(data));
    }
  } catch (error) {
    console.log(error);
    dispatch(displayError(`Ocorreu um erro ${error}`));
    dispatch(createFuncionarioError(error));
  }
};

export const updateFuncionario = (data) => async (dispatch) => {
  try {
    dispatch(updateFuncionarioRequest());
    const value = await funcionarioApi.updateFuncionario(data);
    if (value?.status === 204) {
      dispatch(displaySuccess("Funcionario editado com sucesso!"));
      dispatch(updateFuncionarioSuccess(value));
    } else {
      dispatch(
        displayError(
          `Ocorreu um erro: "${value?.data}" ao atualizar Funcionario ${data?.id}`
        )
        );
      dispatch(updateFuncionarioError(data));
    }
  } catch (error) {
    dispatch(displayError(error));
    dispatch(updateFuncionarioError(error));
    console.log(error);
  }
};

export const deleteFuncionario = (id) => async (dispatch) => {
  try {
    dispatch(deleteFuncionarioRequest());
    const data = await funcionarioApi.deleteFuncionario(id);
    if (data?.status === 204) {
      dispatch(displaySuccess("Funcionario deletado com sucesso!"));
      dispatch(deleteFuncionarioSuccess(data));
    } else {
      dispatch(
        displayError(`Ocorreu um erro ${data} ao deletar o Funcionario ${id}`)
        );
        dispatch(deleteFuncionarioError(data));
    }
  } catch (error) {
    dispatch(displayError(error));
    dispatch(deleteFuncionarioError(error));
    console.log(error);
  }
};
