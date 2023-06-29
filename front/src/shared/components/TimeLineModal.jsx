import React, { useEffect } from "react";
import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import { Timeline } from "primereact/timeline";
import {
  getFuncionarioById
} from "../../redux/actions/funcionarioActions";
import { useDispatch, useSelector } from "react-redux";

export const TimeLineModal = ({
  state,
  handleTimeLineModal,
  content,
  ...args
}) => {
  const dispatch = useDispatch();
  const funcionario = useSelector((store) => store.funcionario?.funcionario?.data);
  const isFetching = useSelector((store) => store.funcionario?.isFetching);
  // console.log(isFetching);
  // console.log(funcionario);

  useEffect(() => {
    if(content?.id) {
      dispatch(getFuncionarioById(content?.id))
    }
  }, [content?.id, dispatch])
  
  console.log('funcionario', funcionario);

  const events = [
    {
      status: "Admissão",
      date: funcionario?.data_admissao,
      color: "#9C27B0",
    },
    {
      status: "Ativo Empresa",
      date: funcionario?.empresa,
      color: "#9C27B0",
    },
    {
      status: "Início Férias",
      date: "25/12/2023",
      color: "#9C27B0",
    },
    {
      status: "Fim Férias",
      date: "25/01/2024",
      color: "#9C27B0",
    },
    {
      status: funcionario?.data_demissao ? "Demissão" : `Ativo no(a) ${funcionario?.empresa}`,
      date: funcionario?.data_demissao || 'Usuário Ativo',
      color: "#9C27B0",
    },
  ];


  return (
    <>
      <Modal isOpen={state} toggle={() => handleTimeLineModal()}>
        <ModalHeader toggle={() => handleTimeLineModal()}>
          Linha do Tempo
        </ModalHeader>
        {isFetching && <Spinner />}

        {!isFetching && (

        
        <ModalBody>
          <div className="grid">
            <div className="col-md-12 page center">
              <div className="row">
                <h3 className="titulo col-md-12">
                  Funcionário {funcionario?.nome}
                </h3>
                <span className="descricao">Empresa {funcionario?.empresa} </span>
                <span className="descricao">{funcionario?.cargo} </span>
                <div className="mb-3"></div>
              </div>
              <div className="card_style">
                <Timeline
                  value={events}
                  opposite={(item) => item.status}
                  content={(item) => (
                    <small className="text-color-secondary">{item.date}</small>
                  )}
                />
              </div>
            </div>
          </div>
        </ModalBody>
        )}
      </Modal>
    </>
  );
};
