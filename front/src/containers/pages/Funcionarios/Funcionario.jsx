import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ReactTableBase } from "../../../shared/components/TablePrimeFaces";
import { ModalForm } from './ModalForm';

import {
  fetchFuncionario,
  deleteFuncionario,
  getFuncionarioById,
} from "../../../redux/actions/funcionarioActions";

export const Usuario = () => {
  const dispatch = useDispatch();
  const isUpdating = useSelector((store) => store.funcionario?.isUpdating);
  const funcionarios = useSelector((store) => store.funcionario?.funcionarios);

  useEffect(() => {
    dispatch(fetchFuncionario());
  }, [dispatch, isUpdating]);

  const deleteItem = async (item) => {
    const id = item?.id;
    await dispatch(deleteFuncionario(id));
  };

  const getItemById = (item) => {
    const id = item?.id;
    dispatch(getFuncionarioById(id));
  };

  return (
    <>
      <div className="page">
        <div className="header">
          <div className="row">
            <h4 className="titulo col-md-12">Tabela Usuários</h4>
            <p className="descricao">Listagem dos Funcionários Cadastrados </p>
          </div>
        </div>
        <ReactTableBase
          items={funcionarios}
          // funcao que remove um item
          removeItem={deleteItem}
          // chamada a API para pegar um item pelo id
          getItemById={getItemById}
          // Component de criacao - formulario
          modalForm={ModalForm}
        />
      </div>
    </>
  );
};
