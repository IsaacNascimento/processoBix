import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import { FileUpload } from "primereact/fileupload";
import { FilterMatchMode } from "primereact/api";
import PropTypes from "prop-types";
import { Dialog } from "primereact/dialog";
import { useSelector } from "react-redux";

const ComponentDefaultForm = () => {
  return <></>;
};

export const ReactTableBase = ({
  items,
  removeItem,
  getItemById,
  modalForm,
  ...args
}) => {
  const Formulario = modalForm || ComponentDefaultForm;
  // Validar Array recebido para tratar error caso haja
  const isArray = Array.isArray(items);
  const itemsValidated = isArray ? items : [];

  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const [deleteItem, setDeleteItem] = useState({});
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const isAdmin = useSelector((store) => store.login?.isAdmin?.isAdmin);

  console.log(items);


  // Validar Array recebido para gerar as colunas da tabela de forma dinâmica
  // Pegar todas as chaves de um objeto e joga para dentro um array que será usado para as colunas da tabela
  let columnNames = [];
  if (itemsValidated) {
    const objectFromArr = itemsValidated[0] || {};

    if (objectFromArr["data_demissao"] === null) {
      delete objectFromArr["data_demissao"];
    }

    Object?.keys(objectFromArr || {})?.forEach((chaveObjeto) => {
      const filtrarColunas =
        chaveObjeto !== "id" &&
        chaveObjeto !== "data_criacao" &&
        chaveObjeto !== "cep" &&
        chaveObjeto !== "empresa" &&
        chaveObjeto !== "cnpj";

      if (filtrarColunas) {
        columnNames.push(chaveObjeto);
      }
    });
  }

  // Fitros globais
  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    setGlobalFilterValue("");
  };

  useEffect(() => {
    initFilters();
  }, []);

  // Abri o Modal de Criar/Editar
  const handleModal = () => {
    setIsOpen((prev) => !prev);
  };

  // Pega item selecionado e abre o modal populando o input com os dados selecionados
  const getItem = (item) => {
    if (getItemById) {
      getItemById(item);
    }
    handleModal();
  };

  const handleDialog = () => {
    setIsDelete((prev) => !prev);
  };

  const deleteProductDialogFooter = (
    <>
      <Button
        label="Não"
        icon="pi pi-times"
        className="bg-success border-0"
        onClick={handleDialog}
      />
      <Button
        label="Sim"
        icon="pi pi-check"
        className="bg-danger border-0"
        onClick={
          removeItem
            ? () => {
                removeItem(deleteItem);
                handleDialog();
              }
            : () => {}
        }
      />
    </>
  );

  const editarRemoverItem = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => getItem(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => {
            handleDialog();
            setDeleteItem(rowData);
          }}
        />
        <Formulario state={isOpen} handleModal={handleModal} />
        <Dialog
          visible={isDelete}
          style={{ width: "450px" }}
          header="Confirmar"
          modal
          footer={deleteProductDialogFooter}
          onHide={handleDialog}
        >
          <div className="flex align-items-center justify-content-center">
            <i
              className="pi pi-exclamation-triangle"
              style={{ fontSize: "1.5rem", marginRight: "1rem" }}
            />

            <span>
              Realmente deseja excluir o item{" "}
              <b>{deleteItem?.nome || deleteItem?.id}?</b>
            </span>
          </div>
        </Dialog>
      </>
    );
  };

  // Recebe o evento, pega o valor e 'seta' os filtros com o valor recebido
  const onGlobalChange = (e) => {
    const value = e?.target?.value;
    let _filters = { ...filters };
    _filters["global"].value = value;
    // console.log(_filters);
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  // Limpa os Filtros
  const clearFilter = () => {
    initFilters();
  };

  const renderHeader = () => {
    return (
      <>
        <div className="header-card">
          <Button
            type="button"
            icon="pi pi-filter-slash"
            label="Limpar"
            className="p-button-outlined mr-4"
            onClick={clearFilter}
          />
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              type="search"
              value={globalFilterValue}
              onChange={onGlobalChange}
              placeholder="Pesquisar..."
            />
          </span>
        </div>
      </>
    );
  };

  // Primeira letra maiúscula do HEADER da Tabela;
  const upperCaseHeaderColumn = (item) => {
    return item.charAt(0).toUpperCase() + item.slice(1);
  };

  const leftToolBarTemplate = () => {
    return (
      <>
        <Button
          label="Novo"
          icon="pi pi-plus"
          className="p-button-success p-2"
          onClick={handleModal}
        />
        <Formulario isModalOpen={isOpen} handleModal={handleModal} />
      </>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <>
        <FileUpload
          mode="basic"
          accept="image/*"
          maxFileSize={1000000}
          label="Importar"
          chooseLabel="Importar"
          className="p-2 p-d-inline-block"
        />
        <div className="mx-2"></div>
        <Button
          label="Exportar"
          icon="pi pi-upload"
          className="p-button-help p-2"
          onClick={() => {}}
        />
      </>
    );
  };

  return (
    <div className="grid">
      <div className="col-md-12">
        <div className="page">
          <div className="card_style">
            {isAdmin ? (
              <Toolbar
                className="p-mb-4"
                left={leftToolBarTemplate}
                right={rightToolbarTemplate}
              ></Toolbar>
            ) : (
              <></>
            )}
            <div className="my-4"></div>
            <DataTable
              value={itemsValidated}
              paginator
              className="p-datatable-striped"
              showGridlines
              rows={4}
              rowsPerPageOptions={[4, 6, 8, 10]}
              dataKey="id"
              emptyMessage="Item não encontrado"
              filterDisplay="menu"
              responsiveLayout="scroll"
              header={renderHeader}
              filters={filters}
            >
              {columnNames.map((item, index) => (
                <Column
                  key={item}
                  field={item}
                  header={() => upperCaseHeaderColumn(item)}
                  style={{ minWidth: "12rem" }}
                />
              ))}
               {itemsValidated[0]?.empresa && (
                <Column
                  key={"empresa"}
                  field={"empresa"}
                  header={"Empresa"}
                  style={{ minWidth: "12rem" }}
                />
              )} 
              {isAdmin ? (
                <Column
                  header="Ação"
                  body={editarRemoverItem}
                  style={{ minWidth: isAdmin ? "10rem" : "0rem" }}
                />
              ) : (
                <></>
              )}
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
};

ReactTableBase.defaultProps = {
  items: PropTypes.arrayOf(PropTypes.shape()),
};
