import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, Col, Input, Row } from "reactstrap";

const optionsMocukp = [
  { uid: "confirmed", title: "Confirmado" },
  { uid: "canceled", title: "Cancelado" },
  { uid: "fail", title: "Esperando" },
];

export const FormEmpresa = () => {
  return (
    <React.Fragment>
      <Row>
        <Col lg={10} sm={8}>
          <h1>Nova Empresa</h1>
        </Col>
        <Col lg={2} sm={4}>
          <Link to={-1}>
            <Button>Voltar</Button>
          </Link>
        </Col>
      </Row>
      <Card
        className="mt-4"
        style={{
          backgroundColor: "#f1f1f1f1",
          height: "auto",
          border: "none",
          marginBottom: "15px",
        }}
      >
        <CardBody>
          <div className="row">
            <div className="mt-2 col-md-7">
              <div className="m-2">
                <h6>Nome Empresa: </h6>
              </div>
              <Input type="text" placeholder="Nome" />
            </div>
            <div className="mt-2 col-md-7">
              <div className="m-2">
                <h6>Data da Empresa: </h6>
              </div>
              <Input type="date" placeholder="Nome" />
            </div>
            <div className="mt-2 col-md-7">
              <div className="m-2">
                <h6>Status da Empresa: </h6>
              </div>
              <Input className="mb-5" type="select" placeholder="Nome">
                <option value="">Selecione</option>
                {optionsMocukp.map((item, index) => (
                  <Fragment key={item.uid}>
                    <option value={item.title}>
                     {item.title}
                    </option>
                  </Fragment>
                ))}
              </Input>
            </div>
          </div>
          <div className="row">
            <div className="col-md-1 col-sm-2">
              <Button>Salvar</Button>
            </div>
            <div className="col-md-11 col-sm-10">
              <Button>Cancelar</Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
