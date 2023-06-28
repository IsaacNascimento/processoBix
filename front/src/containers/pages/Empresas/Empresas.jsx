import React, { useEffect } from "react";
import { ReactTableBase } from "../../../shared/components/TablePrimeFaces";
import { useDispatch, useSelector } from "react-redux";
import { ModalForm } from "./ModalForm";
import { Spinner } from "reactstrap";
import {
  deleteEmpresa,
  fetchEmpresa,
  getEmpresaById,
} from "../../../redux/actions/empresaActions";


export const Empresa = () => {
  const dispatch = useDispatch();
  const isFetching = useSelector((store) => store.empresa?.isFetching);
  const isUpdating = useSelector((store) => store.empresa?.isUpdating);
  const empresas = useSelector((store) => store.empresa?.empresas);

  useEffect(() => {
    dispatch(fetchEmpresa());
  }, [dispatch, isUpdating]);

  const deleteItem = async (item) => {
    const id = item?.id;
    await dispatch(deleteEmpresa(id));
  };

  const getItemById = (item) => {
    const id = item?.id;
    dispatch(getEmpresaById(id));
  };

  return (
    <>
      {isFetching && isUpdating ? (
        <div className="center-spinner-progress">
          <Spinner />
        </div>
      ) : (
        <div className="page">
          <div className="header">
            <div className="row">
              <h4 className="titulo col-md-12">Tabela Empresa</h4>
              <p className="descricao">
                Listagem das Empresas Cadastradas {" "}
              </p>
            </div>
          </div>
          <ReactTableBase
            // array de objetos
            items={empresas}
            // funcao que remove um item
            removeItem={deleteItem}
            // chamada a API para pegar um item pelo id
            getItemById={getItemById}
            // Component de criacao - formulario
            modalForm={ModalForm}
          />
        </div>
      )}
    </>
  );
};
