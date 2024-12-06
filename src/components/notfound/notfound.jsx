import React from "react";
import notfoundImg from "../../images/main/404.png";
export const NotFound = ({ msg }) => {
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <img className="w-96" src={notfoundImg} alt="" />
      <h3 className="tracking-tight text-2xl font-medium">{msg}</h3>
    </div>
  );
};
