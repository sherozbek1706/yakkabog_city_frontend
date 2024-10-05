import React, { useContext } from "react";
import "./modal-image.css";
import { MainContext } from "../../utils/context/context";

export const ModalImage = () => {
  const { setOpen_modal, modal_image, open_modal } = useContext(MainContext);
  const handle = () => {
    setOpen_modal(false);
  };
  return (
    <div
      className={`ModalImage ${open_modal ? `ModalImage__open` : ``}`}
      onClick={handle}
    >
      <div className="Modal" onClick={handle}>
        <img src={modal_image} alt={modal_image} onClick={handle} />
      </div>
    </div>
  );
};
