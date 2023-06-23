import React from "react";
import { ReactTableBase } from "../../../shared/components/TablePrimeFaces";

export const Usuario = () => {
  return (
    <>
      <div className="page">
        <div className="header">
          <div className="row">
            <h4 className="titulo col-md-12">Tabela Usuários</h4>
            <p className="descricao">
              Examplo de fetch data para renderizar na tabela{" "}
            </p>
          </div>
        </div>
        <ReactTableBase items={[]}/>
      </div>
    </>
  );
};
