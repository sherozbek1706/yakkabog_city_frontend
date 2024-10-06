import React, { Fragment, useContext } from "react";
import logo from "../../images/main/logo.png";
import { NavLink } from "react-router-dom";
import "./sidebar.css";
import { MainContext } from "../../utils/context/context";
export const Sidebar = () => {
  const { contractData, sidebar, setSidebar } = useContext(MainContext);
  const closeBar = () => {
    setSidebar("active");
  };
  return (
    <Fragment>
      {sidebar === "active" ? (
        <div className="SidebarBar">
          <i
            className="fa-solid fa-bars icon"
            onClick={() => setSidebar("")}
          ></i>
        </div>
      ) : null}
      <div className={`${sidebar} Sidebar`}>
        <div className="Sidebar__top">
          <div className="Sidebar__logo">
            <img src={logo} alt="Logo" />
            <h3>
              ISHBEKOV <br /> STROI <br /> SERVICE
            </h3>
          </div>
          <div className="SidebarXmark">
            <i className="fa-solid fa-circle-xmark icon" onClick={closeBar}></i>
          </div>
          <div className="Sidebar_nav">
            <NavLink
              to={"/"}
              onClick={closeBar}
              className={({ isActive }) =>
                isActive ? "SidebarNav__link" : null
              }
            >
              <i className="fa-solid fa-passport icon"></i>
              <p>Shartnomalar</p>
            </NavLink>

            <NavLink
              to={"/anketa-list"}
              onClick={closeBar}
              className={({ isActive }) =>
                isActive ? "SidebarNav__link" : null
              }
            >
              <i class="fa-solid fa-list icon"></i>
              <p>Anketalar</p>
            </NavLink>
            {contractData ? (
              <NavLink
                onClick={closeBar}
                to={"/anketa"}
                className={({ isActive }) =>
                  isActive ? "SidebarNav__link" : null
                }
              >
                <i className="fa-solid fa-file-invoice icon"></i>
                <p>Anketa to'ldirish</p>
              </NavLink>
            ) : null}

            <NavLink
              onClick={closeBar}
              to={"/admin"}
              className={({ isActive }) =>
                isActive ? "SidebarNav__link" : null
              }
            >
              <i className="fa-solid fa-user-tie icon"></i>
              <p>Adminlar bo'limi</p>
            </NavLink>
            <NavLink
              onClick={closeBar}
              to={"/apartment"}
              className={({ isActive }) =>
                isActive ? "SidebarNav__link" : null
              }
            >
              <i className="fa-solid fa-building icon"></i>
              <p>Xonadonlar</p>
            </NavLink>
            <NavLink
              onClick={closeBar}
              to={"/add-apartment"}
              className={({ isActive }) =>
                isActive ? "SidebarNav__link" : null
              }
            >
              <i class="fa-solid fa-house-medical icon"></i>
              <p>Xona qo'shish</p>
            </NavLink>

            {/* {contractData ? (
              <NavLink
                onClick={closeBar}
                to={"/model"}
                className={({ isActive }) =>
                  isActive ? "SidebarNav__link" : null
                }
              >
                <i className="fa-regular fa-file icon"></i>
                <p>Modelni Olish</p>
              </NavLink>
            ) : null} */}
          </div>
        </div>
        <div className="Sidebar__bottom">
          <button>
            <i className="fa-solid fa-right-from-bracket icon"></i>
            <p>Chiqish</p>
          </button>
        </div>
      </div>
    </Fragment>
  );
};
