import React from "react";
import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  clearEmpresaById,
  createEmpresa,
  updateEmpresa,
} from "../../../redux/actions/empresaActions";
import { useEffect } from "react";
// import { cnpjMask } from "../../../utils/helpers";


export const ModalForm = ({ isModalOpen, handleModal, ...args }) => {
  const dispatch = useDispatch();
  const isFetching = useSelector((store) => store.empresa.isFetching);
  const isUpdating = useSelector((store) => store.empresa.isUpdating);
  const itemById = useSelector((store) => store.empresa.empresa?.data);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Popular campo do Modal para editar empresa
    if (itemById && !isFetching && !isUpdating) {
      for (let campo in itemById) {
        setValue(campo, itemById[campo]);
      }
    }
    // Limpar campo do Modal para novo empresa
    if (!itemById) {
      reset();
    }
  }, [isFetching, isUpdating, itemById, setValue, reset]);

  // Limpar o estado toda vez que o modal for fechado
  useEffect(() => {
    if (!isModalOpen && itemById) {
      // console.log('entrou no clear campos');
      dispatch(clearEmpresaById());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isModalOpen]);

  const onSubmit = (value) => {
    const values = value;

    if (itemById) {
      // Atualiza empresa
      // const id = itemById?.id;
      dispatch(updateEmpresa(values));
    } else {
      // Cria empresa
      dispatch(createEmpresa( values ));
      handleModal();
    }
  };

  const Titulo = () => {
    if (!itemById) {
      return <div>Criar Empresa</div>;
    }
    return (
      <div>
        Editar <b>{itemById.nome}</b>
      </div>
    );
  };

  return (
    <>
      <Modal isOpen={isModalOpen} toggle={() => handleModal()}>
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
            <ModalBody >
              <form className="form" onSubmit={handleSubmit(onSubmit)}>
                
                <div className="row">

                  <div className="col-md-6 my-2">
                    <h6>Nome Empresa</h6>
                    <input
                      {...register("nome", { required: true })}
                      placeholder="Nome Empresa"
                      className="input-modal-form"
                      type="text"
                    />
                    {errors.nome && (
                      <span className="span-validation">
                        O campo nome é obrigatório
                      </span>
                    )}
                  </div>

                  <div className="col-md-6 my-2">
                    <h6>CNPJ</h6>
                    <input
                      {...register("cnpj", { required: true })}
                      placeholder="Cnpj"
                      className="input-modal-form"
                      type="text"
                      // value={cnpjMask((e) => e.target.value)}
                    />
                    {errors.cnpj && (
                      <span className="span-validation">
                        O campo cnpj é obrigatório
                      </span>
                    )}
                  </div>

                  <div className="col-md-6 my-2">
                    <h6>Endereço</h6>
                    <input
                      {...register("endereco", { required: true })}
                      placeholder="Endereço"
                      className="input-modal-form"
                      type="text"
                    />
                    {errors.endereco && (
                      <span className="span-validation">
                        O campo Endereço é obrigatório
                      </span>
                    )}
                  </div>

                  <div className="col-md-6 my-2">
                    <h6>CEP</h6>
                    <input
                      {...register("cep", { required: true })}
                      placeholder="CEP"
                      className="input-modal-form"
                      type="text"
                    />
                    {errors.cep && (
                      <span className="span-validation">
                        O campo CEP é obrigatório
                      </span>
                    )}
                  </div>

                  <div className="col-md-6 my-2">
                    <h6>Telefone</h6>
                    <input
                      {...register("telefone", { required: true })}
                      placeholder="Telefone"
                      className="input-modal-form"
                      type="text"
                    />
                    {errors.telefone && (
                      <span className="span-validation">
                        O campo Telefone é obrigatório
                      </span>
                    )}
                  </div>

                  <div className="col-md-6 my-2">
                    <h6>Email</h6>
                    <input
                      {...register("email", { required: true })}
                      placeholder="Email"
                      className="input-modal-form"
                      type="email"
                    />
                    {errors.email && (
                      <span className="span-validation">
                        O campo Email é obrigatório
                      </span>
                    )}
                  </div>

                  <div className="col-md-6 my-2">
                    <h6>Area Atuação</h6>
                    <input
                      {...register("area", { required: true })}
                      placeholder="Área de Atuação"
                      className="input-modal-form"
                      type="text"
                    />
                    {errors.area && (
                      <span className="span-validation">
                        O campo Área Atuação é obrigatório
                      </span>
                    )}
                  </div>

                </div>

                <div style={{marginTop:"8px"}} className="row">
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
