import React, { useState } from "react";
import reactDom from "react-dom";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../redux";
import css from "./modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faTrash } from "@fortawesome/free-solid-svg-icons";

const imgIcon = <FontAwesomeIcon icon={faImages} />;
const trashIcon = <FontAwesomeIcon icon={faTrash} />;

const DpModal = ({ setShow, profile }) => {
  const dispatch = useDispatch();
  const [dp, setDp] = useState("");
  const [image, setImage] = useState(profile.about.profilepic);
  const [error, setError] = useState("");

  const onPicChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setDp(e.target.files[0]);
  };

  const onRemove = (e) => {
    e.preventDefault();
    setDp("");
    setImage("");
  };

  const onUpload = () => {
    if (image === "") {
      setError("Upload a valid image");
    } else if (image === profile.about.profilepic) {
      setShow(false);
    } else {
      dispatch(actionCreators.addDp(dp));
      setShow(false);
    }
  };

  return reactDom.createPortal(
    <>
      <div className={css.backdrop}></div>
      <div className={css.modal}>
        <div className={css.imagePreview}>
          {dp !== "" && (
            <div className={css.deletebtn} onClick={onRemove}>
              <span>{trashIcon}</span>
            </div>
          )}
          {dp !== "" ? (
            <img src={image} alt="Profile" className={css.dimage} />
          ) : (
            <label htmlFor="dp">
              <span className={css.icon}>{imgIcon}</span>
            </label>
          )}
          <input type="file" id="dp" onChange={onPicChange} />
        </div>
        <button className={css.uploadBtn} onClick={onUpload}>
          Upload
        </button>
        <button className={css.uploadBtn} onClick={() => setShow(false)}>
          Cancel
        </button>
        {error !== "" && <h3>{error}</h3>}
      </div>
    </>,
    document.getElementById("dpmodal")
  );
};

export default DpModal;
