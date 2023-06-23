import React from 'react';
import { SideBarPro } from "./SideBarPro";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Col, Navbar, NavbarBrand, Row } from "reactstrap";


export const LayoutSideProBar = () => {
  return (
    <React.Fragment>
        <Row>
        <Col>
          <Navbar
            className="my-2"
            style={{ backgroundColor: "#c7c7c7b3" }}
          >
            <NavbarBrand href="/">
              {/* <img
                alt="logo"
                src="/logo-white.svg"
                style={{
                  height: 40,
                  width: 40,
                }}
              /> */}
            </NavbarBrand>
          </Navbar>
        </Col>
        <Col>
          <ProSidebarProvider>
            <SideBarPro />
          </ProSidebarProvider>
        </Col>
      </Row>
    </React.Fragment>
  )
}
