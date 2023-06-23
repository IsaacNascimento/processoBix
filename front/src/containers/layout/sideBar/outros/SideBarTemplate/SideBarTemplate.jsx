import React from "react";
import { Container } from "reactstrap";
import SimpleBar from "simplebar-react";
import { VerticalLayoutTemplate } from "../../../../../components/VerticalLayoutTemplate";

export const SideBarTemplate = () => {
  return (
    <React.Fragment>
      <div className="app-menu navbar-menu">
        Hello
        <React.Fragment>
          <SimpleBar id="scrollbar" className="h-100">
            <Container fluid>
              <ul className="navbar-nav" id="navbar-nav">
                Simple Bar
                <VerticalLayoutTemplate />
              </ul>
            </Container>
          </SimpleBar>
        </React.Fragment>
      </div>
    </React.Fragment>
  );
};
