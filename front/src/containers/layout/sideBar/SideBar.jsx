import React, { useState } from "react";
import { Collapse } from "reactstrap";
import * as BsIcons from "react-icons/bs";
import { sideBarDataItems } from "./SideBarData";
import { Link } from "react-router-dom";

export const SideBar = ({ isExpanded, ...args }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCollapse = (id) => {
    setIsOpen((prev) => (prev === id ? false : id));
  };

  return (
    <React.Fragment>
      <div
        data-testid="div-sidebar"
        className={isExpanded ? "sidebar" : "sidebar collapsed"}
      >
        <div className="siderbar-items">
          {sideBarDataItems.map((items, key) => (
            <React.Fragment key={key}>
              <div className="item" onClick={() => handleCollapse(key)}>
                {items.icon}
                {/* item com link caso ele não possua submenu  */}
                {!items.subMenu ? (
                  <Link to={items?.path}>
                    <span className="sidebar-text">{items.title}</span>
                  </Link>
                ) : (
                  <span className="sidebar-text">{items.title}</span>
                )}

                {items.subMenu && items.arrowIcon}
              </div>

              <Collapse isOpen={isOpen === key}>
                {items.subMenu?.map((subItems, key) => (
                  <ul className="item-nav" key={key}>
                    <div className="nav-line">
                      <BsIcons.BsDash style={{ float: "left" }} />
                      <li className="nav-link">
                        <Link to={subItems?.path}>{subItems?.title}</Link>
                      </li>
                    </div>
                  </ul>
                ))}
              </Collapse>
            </React.Fragment>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};
