import React from "react";
import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFuncionarioById,
  createFuncionario,
  updateFuncionario,
} from "../../../redux/actions/funcionarioActions";
import { useEffect } from "react";
import { fetchEmpresa } from "../../../redux/actions/empresaActions";

export const ModalForm = ({ isModalOpen, handleModal, ...args }) => {
  const dispatch = useDispatch();
  const isFetching = useSelector((store) => store.funcionario.isFetching);
  const isUpdating = useSelector((store) => store.funcionario.isUpdating);
  const itemById = useSelector((store) => store.funcionario.funcionario?.data);
  const empresas = useSelector((store) => store.empresa?.empresas);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Popular campo do Modal para editar funcionário
    if (itemById && !isFetching && !isUpdating) {
      for (let campo in itemById) {
        setValue(campo, itemById[campo]);
      }
    }
    // Limpar campo do Modal para novo funcionário
    if (!itemById) {
      reset();
    }
  }, [isFetching, isUpdating, itemById, setValue, reset]);

  useEffect(() => {
    dispatch(fetchEmpresa());
  }, [dispatch, isUpdating]);

  // Limpar o estado toda vez que o modal for fechado
  useEffect(() => {
    if (!isModalOpen) {
      // console.log('entrou no clear campos');
      dispatch(clearFuncionarioById());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isModalOpen]);


  const onSubmit =  (value) => {
    const values = value;
    console.log(values);

    if (itemById) {
      // Atualiza Funcionário
      // const id = itemById?.id;
      dispatch(updateFuncionario(values));
      handleModal();
 
    } else {
      // Cria Funcionário
      dispatch(createFuncionario(values));
      // handleModal();
    }
  };

  const Titulo = () => {
    if (!itemById) {
      return <div>Criar Funcionário</div>;
    }
    return (
      <div>
        Editar <b>{itemById.nome}</b>
      </div>
    );
  };

  return (
    <>
      <Modal
        style={{ width: "600px" }}
        isOpen={isModalOpen}
        toggle={() => handleModal()}
      >
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
                  <div className="col-md-6 my-2">
                    <h6>Nome</h6>
                    <input
                      {...register("nome", { required: true })}
                      placeholder="Nome"
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
                    <h6>CPF</h6>
                    <input
                      {...register("cpf", { required: true })}
                      placeholder="CPF"
                      className="input-modal-form"
                      type="text"
                    />
                    {errors.cpf && (
                      <span className="span-validation">
                        O campo CPF é obrigatório
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
                      type="text"
                    />
                    {errors.email && (
                      <span className="span-validation">
                        O campo Email é obrigatório
                      </span>
                    )}
                  </div>
                  <div className="col-md-6 my-2">
                    <h6>Cargo</h6>
                    <input
                      {...register("cargo", { required: true })}
                      placeholder="Cargo"
                      className="input-modal-form"
                      type="text"
                    />
                    {errors.cargo && (
                      <span className="span-validation">
                        O campo Cargo é obrigatório
                      </span>
                    )}
                  </div>
                  <div className="col-md-6 my-2">
                    <h6>Data Admissão</h6>
                    <input
                      {...register("data_admissao", { required: true })}
                      placeholder="Data Admissão"
                      className="input-modal-form"
                      type="text"
                    />
                    {errors.data_admissao && (
                      <span className="span-validation">
                        O campo Data Admissão é obrigatório
                      </span>
                    )}
                  </div>

                  {itemById ? (
                    <div className="col-md-6 my-2">
                      <h6>Data Demissão</h6>
                      <input
                        {...register("data_demissao")}
                        placeholder="Data Demissão"
                        className="input-modal-form"
                        type="text"
                      />
    
                    </div>
                  ) : (
                    <></>
                  )}

                  <div className="col-md-6 mt-1">
                    <h6 className="mb-3">Empresa vinculado</h6>
      
                    <select className="input-modal-form"  {...register("empresa", { required: true })}>
                      {empresas?.map((empresa, key) => (
                        <option key={empresa.id} value={empresa.nome}>{empresa?.nome}</option>
                      ))}
                    </select>
               
                    {errors.empresa && (
                      <span className="span-validation">
                        O campo Empresa é obrigatório
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ marginTop: "8px" }} className="row">
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
