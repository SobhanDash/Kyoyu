import React from "react";
import css from "./modal.module.css";
import reactDom from "react-dom";

const FeatModal = ({ fshow, fn }) => {
  if (!fshow) {
    return null;
  }

  return reactDom.createPortal(
    <>
      <div className={css.fbackdrop}></div>
      <div className={css.featcont}>
        <button className={`${css.fbutton} ${css.delete}`}>Delete</button>
        <button className={`${css.fbutton} ${css.share}`}>Share</button>
        <button className={`${css.fbutton} ${css.update}`}>Update</button>

        <button className={`${css.fbutton} ${css.cancel}`} onClick={fn}>
          Cancel
        </button>
      </div>
    </>,
    document.getElementById("featModal")
  );
};

export default FeatModal;
