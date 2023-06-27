import React from "react";
import * as AiIcons from "react-icons/ai";
import * as MDIcons from "react-icons/md";

const iconStyle = "sidebar-icon";
const arrowStyle = "sidebar-arrow-icon";
const arrowIcon = <MDIcons.MdArrowForwardIos className={arrowStyle} />;

export const sideBarDataItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: <AiIcons.AiFillHome className={iconStyle} />,
    arrowIcon: arrowIcon,
    cName: "nav-text",
    subMenu: [
      { title: "Empresas", path: "/empresa" },
      { title: "Funcionários", path: "/funcionários" }
    ],
  },
  {
    title: "Linha do tempo",
    path: "/linha/tempo",
    icon: <AiIcons.AiOutlineBarChart className={iconStyle} />,
    arrowIcon: arrowIcon,
    cName: "nav-text",
  },
];
