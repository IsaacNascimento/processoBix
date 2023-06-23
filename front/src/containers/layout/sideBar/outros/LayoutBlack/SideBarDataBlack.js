import React from "react";
import * as AiIcons from "react-icons/ai";
import * as SiIcons from "react-icons/si";

export const sideBarData = [
  {
    label: "Menu",
    isHeader: true,
  },
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
    subMenu: [
      { title: "SubMenu 1", path: "/" },
      { title: "SubMenu 2", path: "/" },
    ],
  },
  {
    title: "Usúarios",
    path: "/usuarios",
    icon: <AiIcons.AiOutlineUser />,
    cName: "nav-text",
    subMenu: [
      { title: "SubMenu 1", path: "/" },
      { title: "SubMenu 2", path: "/" },
    ],
  },
  {
    title: "Produtos",
    path: "/produtos",
    icon: <SiIcons.SiBookstack />,
    cName: "nav-text",
    subMenu: [
      { title: "SubMenu 1", path: "/" },
      { title: "SubMenu 2", path: "/" },
    ],
  },
  {
    label: "Outro",
    isHeader: true,
  },
  {
    title: "Novo Usuário",
    path: "/criar-usuario",
    icon: <AiIcons.AiOutlineUserAdd />,
    cName: "nav-text",
    subMenu: [
      { title: "SubMenu 1", path: "/" },
      { title: "SubMenu 2", path: "/" },
    ],
  },
  {
    title: "Novo Usuário",
    path: "/criar-usuario",
    icon: <AiIcons.AiOutlineUserAdd />,
    cName: "nav-text",
  },
];
