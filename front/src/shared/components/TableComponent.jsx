import React, { useState } from "react";
import { Table } from "reactstrap";
import DataService from "../../utils/serviceExemplo";
import { BadgerComponent } from "./BadgerComponent";
import * as BsIcons from "react-icons/bs";
import * as CiIcons from "react-icons/ci";
import { ModalForm } from "../../containers/pages/Exemplo/ModalForm";

export const TableComponent = ({exemploItems, removeItem, currentPage, ...args}) => {
  // console.log('currentPage: ', currentPage);
  const [ isOpen, setIsOpen ] = useState(false);
  const [ itemById, setItemById ] = useState({});

  const reloadPage = () => {
    return isOpen ? window.location.reload() : null;
  }

  const handleModal = () => {
    reloadPage();
    setIsOpen((prev) => !prev)
  };

  const getItem= (id) => {
    setItemById(DataService.getItemById(id));
  }

  return (
    <div className="table-responsive mt-5" >
      <Table className="table-nowrap align-middle mb-0">
        <thead >
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">Data</th>
            <th scope="col">Status</th>
            <th scope="col">Ação</th>
          </tr>
        </thead>
        <tbody className="body-table">
          {exemploItems?.map((item, key) => (
            <tr key={item.id}>
              <td className="fw-medium">{item?.id?.substr(-7)}</td>
              <td>{item.nome}</td>
              <td>{item.data}</td>
              <td className="badge-style">
                <BadgerComponent status={item.status} />
              </td>
              <td>
                <span
                  className="acao-iten-stretch"
                  onClick={() => 
                    removeItem(item.id)
                  }
                >
                  <BsIcons.BsFillTrashFill />
                </span>
                <span
                  className="mx-2 acao-iten"
                  onClick={() =>  {
                      getItem(item.id)
                      handleModal();
                    }}
                >
                  <CiIcons.CiEdit />
                </span>
                <ModalForm state={isOpen} handleModal={handleModal} itemById={itemById} currentPage={currentPage}/>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
