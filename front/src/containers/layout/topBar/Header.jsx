import React, { useEffect, useState } from "react";
import { ProfileDropdown } from "./components/ProfileDropdown";
import logo from "../../../shared/images/haas-logo.png";
import { Link } from "react-router-dom";
import * as RiIcons from "react-icons/ri";

export const Header = ({handleToggler, ...args}) => {
  const [headerClass, setHeaderClass] = useState("");
  const scrollNavigation = () => {
    var scrollup = document.documentElement.scrollTop;
    if (scrollup > 50) {
      setHeaderClass("topbar-shadow");
    } else {
      setHeaderClass("");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollNavigation, true);
  });
  return (
    <React.Fragment>
      <header className={`page-topbar ${headerClass}`}>
        <div className="layout-width">
          <div className="navbar-header">
            <div id="logo-navbar" className="logo-collapsed">
              <div className="logo__button-collapse">
                <button
                  onClick={() => handleToggler()}
                >
                  <RiIcons.RiMenuLine className="sidebar-icon" />
                </button>
                <Link to={"/exemplo"}>
                  <img
                    className="m-4"
                    width={140}
                    src={logo}
                    alt="hepta-logo"
                  />
                </Link>
              </div>
            </div>
            <ProfileDropdown />
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};
