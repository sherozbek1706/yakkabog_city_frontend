import React from "react";
import "./header.css";

export const Header = ({ title }) => {
  return (
    <div className="Header">
      <h2>{title}</h2>
    </div>
  );
};
