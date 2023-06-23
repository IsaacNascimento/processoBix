import React, { useEffect } from "react";
import { ReactTableBase } from "../../../shared/components/TablePrimeFaces";
import { useDispatch, useSelector } from "react-redux";
import { ModalForm } from "./ModalForm";
import { Spinner } from "reactstrap";
import {
  deleteExemplo,
  fetchExemplos,
  getExemploById,
} from "../../../redux/actions/exemploActions";

export const Exemplo = () => {
  const dispatch = useDispatch();
  const isFetching = useSelector((store) => store.exemplo?.isFetching);
  const isUpdating = useSelector((store) => store.exemplo?.isUpdating);
  const exemplos = useSelector((store) => store.exemplo?.exemplos?.data);

  useEffect(() => {
    dispatch(fetchExemplos());
  }, [dispatch, isUpdating]);

  const deleteItem = async (item) => {
    const id = item?.id;
    await dispatch(deleteExemplo(id));
  };

  const getItemById = (item) => {
    const id = item?.id;
    dispatch(getExemploById(id));
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
              <h4 className="titulo col-md-12">Tabela Exemplo</h4>
              <p className="descricao">
                Examplo de fetch data para renderizar na tabela{" "}
              </p>
            </div>
          </div>
          <ReactTableBase
            // array de objetos
            items={exemplos}
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
