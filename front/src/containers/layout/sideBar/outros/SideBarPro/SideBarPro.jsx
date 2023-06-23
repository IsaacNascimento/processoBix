import React, { Fragment } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu,
} from "react-pro-sidebar";
import { sideBarData } from "../SideBarData";

export const SideBarPro = () => {
  const { collapseSidebar } = useProSidebar();

  return (
    <div style={{ display: "flex", height: "100vh", color: "black" }}>
      <Sidebar>
        <Menu>
          {sideBarData.map((item, key) => (
            <Fragment key={key}>
              {item.subMenu && item.subMenu.length > 0 && (
                <SubMenu icon={item.icon} label={item.title}>
                  {item.subMenu.map((subTitulo, key) => (
                    <MenuItem key={key}>
                      <span>{subTitulo.title}</span>
                    </MenuItem>
                  ))}
                </SubMenu>
              )}
            </Fragment>
          ))}
        </Menu>
      </Sidebar>
      <main style={{ padding: 10 }}>
        <div>
          <button className="sb-button" onClick={() => collapseSidebar()}>
            Collapse
          </button>
        </div>
      </main>
    </div>
  );
};
