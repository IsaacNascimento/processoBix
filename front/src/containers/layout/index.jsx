import React, { useEffect, useState } from 'react';
import { Notificationbar } from './notificationbar/Notificationbar';
import { SideBar } from './sideBar/SideBar';
import { Header } from './topBar/Header';

export const Layout = () => {
  const sidebarCollapsed = localStorage.getItem("sidebar-collapsed");
  const [div, setDiv] = useState({});
  const [isExpanded, setIsExpanded] = useState(sidebarCollapsed ? false : true);

  useEffect(() => {
    // Manter o conteudo expandido caso haja refresh da pagina
    const divRoot = window.document.getElementById("container");
    if (isExpanded) {
      divRoot?.setAttribute("class", "main-content");
    };
    setDiv(divRoot);
  }, [isExpanded]);

  const handleToggler = () => {
    // FECHAR a sideBar
    if (isExpanded) {
      setIsExpanded(false);
      localStorage.setItem("sidebar-collapsed", true);
      div?.removeAttribute("class");
    };
    // ABRIR a sideBar
    if (!isExpanded) {
    setIsExpanded(true);
    localStorage.removeItem("sidebar-collapsed");
    div?.setAttribute("class", "main-content");
    }
  }

  return (
    <React.Fragment>
        <Notificationbar />
        <Header handleToggler={handleToggler} />
        <SideBar isExpanded={isExpanded}/>
    </React.Fragment>
  )
}
