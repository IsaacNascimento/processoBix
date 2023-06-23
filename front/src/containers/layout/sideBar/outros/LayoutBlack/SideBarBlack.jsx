import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import { sideBarData } from "../../SideBarData";
import * as FaIcons from "react-icons/fa";

export const SideBarBlack = () => {
  const [isSideBarOPen, setIsSideBarOPen] = useState(false);
  console.log(isSideBarOPen);

  const showSideBar = () => {
    setIsSideBarOPen((prev) => !prev);
  };

  return (
    <>
      <div className="navbar">
        <div className="menu-bars">
          <span>
            <FaIcons.FaBars onClick={showSideBar} />
          </span>
        </div>
      </div>

      <nav className={isSideBarOPen ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items">
          <div className="navbar-toogle">
            <Link to="#" className="menu-bars">
              <AiIcons.AiOutlineClose onClick={showSideBar} />
            </Link>
          </div>
          <div className="margin-from-child"></div>
          {sideBarData.map((item, key) => {
            return (
              <li key={key} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};
