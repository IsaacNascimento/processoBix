import React from "react";
import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  clearExemploById,
  createExemplo,
  updateExemplo,
} from "../../../redux/actions/exemploActions";
import { useEffect } from "react";

export const ModalForm = ({ state, handleModal, ...args }) => {
  const dispatch = useDispatch();
  const isFetching = useSelector((store) => store.exemplo.isFetching);
  const isUpdating = useSelector((store) => store.exemplo.isUpdating);
  const itemById = useSelector((store) => store.exemplo.exemplo?.data);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Popular campo do Modal para editar exemplo
    if (itemById && !isFetching && !isUpdating) {
      for (let campo in itemById) {
        setValue(campo, itemById[campo]);
      }
    }
    // Limpar campo do Modal para novo exemplo
    if (!itemById) {
      reset();
    }
  }, [isFetching, isUpdating, itemById, setValue, reset]);

  // Limpar o estado toda vez que o modal for fechado
  useEffect(() => {
    if (!state) {
      dispatch(clearExemploById());
    }
  }, [dispatch, state]);

  const onSubmit = (value) => {
    const values = value;
    const { nome, status } = values;

    if (itemById) {
      // Atualiza Exemplo
      const id = itemById?.id;
      dispatch(updateExemplo({ id, nome, status }));
    } else {
      // Cria Exemplo
      const id = Math.floor(Math.random() * 10000000);
      dispatch(createExemplo({ id, nome, status }));
      handleModal();
    }
  };

  const Titulo = () => {
    if (!itemById) {
      return <div>Criar Exemplo</div>;
    }
    return (
      <div>
        Editar Item <b>{itemById.nome}</b>
      </div>
    );
  };

  return (
    <>
      <Modal isOpen={state} toggle={() => handleModal()}>
        {(isFetching || isUpdating) && (
          <ModalBody className="center-spinner-progress">
            <Spinner />
          </ModalBody>
        )}
        {(!isFetching || !isUpdating) && (
          <>
            <ModalHeader toggle={() => handleModal()}>
              <Titulo />
            </ModalHeader>
            <ModalBody>
              <form className="form" onSubmit={handleSubmit(onSubmit)}>
                
                <div className="row">
                  <div className="col-md-12 my-2">
                    <h6>Nome Exemplo</h6>
                    <input
                      {...register("nome", { required: true })}
                      placeholder="Nome Exemplo"
                      className="input-modal-form"
                      type="text"
                    />
                    {errors.nome && (
                      <span className="span-validation">
                        O campo nome é obrigatório
                      </span>
                    )}
                  </div>

                  <div className="mt-2 col-md-12 my-3">
                    <div className="m-0">
                      <h6>Status do exemplo: </h6>
                    </div>
                    <input
                      type="checkbox"
                      className="select-modal-field"
                      {...register("status")}
                    />
                  </div>
                </div>

                <hr />
                <div className="row">
                  <div className="col-md-6 col-sm-6">
                    <button
                      className="primary-button"
                      type="submit"
                      color="primary"
                    >
                      Salvar
                    </button>
                  </div>

                  <div className="col-md-6 col-sm-6">
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() => {
                        handleModal();
                      }}
                      color="secondary"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </form>
            </ModalBody>
          </>
        )}
      </Modal>
    </>
  );
};
