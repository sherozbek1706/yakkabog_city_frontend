import React, { Fragment, useContext } from "react";
import { Header, ModalImage } from "../../components";
import { useParams } from "react-router-dom";
import "./floor.css";
// import music from "../../assets/1.mp3";
import { MainContext } from "../../utils/context/context";

import birXonalik from "../../images/dom/1xona-1.jpg";
import ikkiXonalik1 from "../../images/dom/2xona-1.jpg";
import ikkiXonalik2 from "../../images/dom/2xona-2.jpg";
import ikkiXonalik3 from "../../images/dom/2xona-3.jpg";
import uchXonalik1 from "../../images/dom/3xona-1.jpg";
import uchXonalik2 from "../../images/dom/3xona-2.jpg";

export const Floor = () => {
  const { id } = useParams();
  const { setModal_image, setOpen_modal } = useContext(MainContext);

  const handle = (image) => {
    // const audio = new Audio(music);
    setModal_image(image);
    setOpen_modal(true);
    // audio.play();
  };
  return (
    <Fragment>
      <ModalImage />
      <Header title={"Qavat " + id} />
      <div className="Floor">
        <div className="Floor_box top">
          <i
            class="fa-regular fa-image icon"
            onClick={() => {
              handle(ikkiXonalik1);
            }}
          ></i>
        </div>
        <div className="Floor_box top">
          <i
            class="fa-regular fa-image icon"
            onClick={() => {
              handle(ikkiXonalik2);
            }}
          ></i>
        </div>
        <div className="Floor_box top">
          <i
            class="fa-regular fa-image icon"
            onClick={() => {
              handle(ikkiXonalik2);
            }}
          ></i>
        </div>
        <div className="Floor_box top">
          <i
            class="fa-regular fa-image icon"
            onClick={() => {
              handle(ikkiXonalik1);
            }}
          ></i>
        </div>
        <div className="Floor_box top">
          <i
            class="fa-regular fa-image icon"
            onClick={() => {
              handle(birXonalik);
            }}
          ></i>
        </div>
        <div className="Floor_box top">
          <i
            class="fa-regular fa-image icon"
            onClick={() => {
              handle(uchXonalik1);
            }}
          ></i>
        </div>
        <div className="Floor_box bottom">
          <i
            class="fa-regular fa-image icon"
            onClick={() => {
              handle(birXonalik);
            }}
          ></i>
        </div>
        <div className="Floor_box bottom">
          <i
            class="fa-regular fa-image icon"
            onClick={() => {
              handle(ikkiXonalik3);
            }}
          ></i>
        </div>
        <div className="Floor_box bottom">
          <i
            class="fa-regular fa-image icon"
            onClick={() => {
              handle(ikkiXonalik3);
            }}
          ></i>
        </div>
        <div className="Floor_box bottom">
          <i
            class="fa-regular fa-image icon"
            onClick={() => {
              handle(birXonalik);
            }}
          ></i>
        </div>
        <div className="Floor_box bottom">
          <i
            class="fa-regular fa-image icon"
            onClick={() => {
              handle(birXonalik);
            }}
          ></i>
        </div>
        <div className="Floor_box bottom">
          <i
            class="fa-regular fa-image icon"
            onClick={() => {
              handle(uchXonalik2);
            }}
          ></i>
        </div>
      </div>
    </Fragment>
  );
};
