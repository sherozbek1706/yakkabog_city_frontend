import React, { Fragment } from "react";
import "./contract-list.css";
import { Header } from "../../../components";

export const ContractList = () => {
  return (
    <Fragment>
      <Header title={"SHARTNOMALAR"} />
      <div className="ContractList">
        <div className="ContractList__boxes">
          <div className="ContractListBoxes__box">
            <i className="fa-solid fa-folder-open icon"></i>
            <p className="ContractListBoxes__box__title">1-shartnoma</p>
            <p className="ContractListBoxes__box__date">01-11-2024</p>
            <button className="ContractListBoxes__box__btn">KIRISH</button>
          </div>
          <div className="ContractListBoxes__box">
            <i className="fa-solid fa-folder-open icon"></i>
            <p className="ContractListBoxes__box__title">2-shartnoma</p>
            <p className="ContractListBoxes__box__date">05-11-2024</p>
            <button className="ContractListBoxes__box__btn">KIRISH</button>
          </div>
          <div className="ContractListBoxes__box">
            <i className="fa-solid fa-folder-open icon"></i>
            <p className="ContractListBoxes__box__title">3-shartnoma</p>
            <p className="ContractListBoxes__box__date">26-11-2024</p>
            <button className="ContractListBoxes__box__btn">KIRISH</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
