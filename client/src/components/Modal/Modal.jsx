import React, { useEffect, useRef, useState } from "react";
import reactDom from "react-dom";

// import { useHistory } from "react-router";
import useForm from "../../services/useForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt, faImages } from "@fortawesome/free-solid-svg-icons";
import css from "./modal.module.css";

const cloud = <FontAwesomeIcon icon={faCloudUploadAlt} />;
const imgIcon = <FontAwesomeIcon icon={faImages} />;

const Modal = ({ show, setShow }) => {
  // const history = useHistory();
  const [image, setImage] = useState("");
  const [cap, setCap] = useState("");
  const [url, setUrl] = useState("");
  const { profile, getProfile, addPost } = useForm();
  const imageRef = useRef();

  // useEffect(() => {
  //   getProfile();
  // }, [getProfile]);

  if (!show) {
    return null;
  }

  return reactDom.createPortal(
    <>
      <div className={css.backdrop}></div>
      <section className={css.modal}>
        <div className={css.wrapper}>
          <div className={css.image} id="image"></div>
          <div className={css.content}>
            <div className={css.icon}>{imgIcon}</div>
            <div className={css.text}>No File Chosen</div>
          </div>
        </div>
        {imageRef.current !== undefined && (
          <div className={css.picDisplay}></div>
        )}
        <label for="upload_file" className={css.customLabel}>
          <span> {cloud} </span> Custom Upload
        </label>
        <input
          className={css.deaultBtn}
          id="upload_file"
          type="file"
          name="post"
          ref={imageRef}
        />
        <input
          className={css.caption}
          value={cap}
          type="text"
          name="caption"
          placeholder="What's on your Mind"
          onChange={(e) => setCap(e.target.value)}
        />
        <button className={css.uploadBtn}>Upload</button>
        <button className={css.uploadBtn} onClick={() => setShow(false)}>
          Cancel
        </button>
      </section>
    </>,
    document.getElementById("modal")
  );
};

export default Modal;
