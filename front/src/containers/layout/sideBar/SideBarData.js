import React from "react";
import * as AiIcons from "react-icons/ai";
import * as SiIcons from "react-icons/si";
import * as MDIcons from "react-icons/md";

const iconStyle = "sidebar-icon";
const arrowStyle = "sidebar-arrow-icon";
const arrowIcon = <MDIcons.MdArrowForwardIos className={arrowStyle} />;

export const sideBarDataItems = [
  {
    title: "Exemplo",
    path: "/",
    icon: <AiIcons.AiFillHome className={iconStyle} />,
    arrowIcon: arrowIcon,
    cName: "nav-text",
    subMenu: [{ title: "Exemplo", path: "/exemplo" }],
  },
  {
    title: "Usúarios",
    path: "/usuarios",
    icon: <AiIcons.AiOutlineUser className={iconStyle} />,
    arrowIcon: arrowIcon,
    cName: "nav-text",
    subMenu: [{ title: "Usuários", path: "/usuarios" }],
  },
  {
    title: "Produtos",
    path: "/produtos",
    icon: <SiIcons.SiBookstack className={iconStyle} />,
    arrowIcon: arrowIcon,
    cName: "nav-text",
    subMenu: [{ title: "Produtos", path: "/produtos" }],
  },
  {
    title: "Novo Usuário",
    path: "/criar-usuario",
    icon: <AiIcons.AiOutlineUserAdd className={iconStyle} />,
    arrowIcon: arrowIcon,
    cName: "nav-text",
    subMenu: [{ title: "Criar Usuário", path: "/novo-usuario" }],
  },
  {
    title: "Gráfico",
    path: "/dashboard",
    icon: <AiIcons.AiOutlineBarChart className={iconStyle} />,
    arrowIcon: arrowIcon,
    cName: "nav-text",
  },
];
