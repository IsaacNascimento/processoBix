import React from "react";
import * as AiIcons from "react-icons/ai";
import * as SiIcons from "react-icons/si";
import { DropdownItem } from "reactstrap";
import { Link } from "react-router-dom";

const item = [
  {
    uid: "header",
    header: true,
    title: "Header",
    propText: false,
  },
  {
    uid: "produtos",
    title: "Produtos",
    icon: <SiIcons.SiBookstack />,
    path: "/produtos",
    propText: true,
    header: false,
  },
  {
    uid: "usuarios",
    title: "Perfil",
    icon: <AiIcons.AiOutlineUser />,
    path: "/usuarios",
    propText: true,
    header: false,
  },
  {
    uid: "divider",
    divider: true,
    propText: false,
    header: false,
  },
];

export const DropItem = () => {
  return (
    <>
      {item.map((item) => (
        <DropdownItem
          key={item.uid}
          header={item.header}
          divider={item.divider ? item.divider : false}
          text={item.propText}
        >
          <Link to={item.path}>
            <span>{item.icon}</span>
            <span className="drop-item-text">{item.title}</span>
          </Link>
        </DropdownItem>
      ))}
    </>
  );
};
