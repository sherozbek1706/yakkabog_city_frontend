import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../sidebar/sidebar";
import { MainContext } from "../../utils/context/context";

export const Layout = () => {
  const { sidebar, setSidebar } = useContext(MainContext);
  return (
    <div className={"MainContainer"}>
      <Sidebar />
      <div className={`${sidebar} MainContent`}>
        <Outlet />
      </div>
    </div>
  );
};
