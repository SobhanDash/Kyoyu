import React, { useEffect, useRef, useState } from "react";
import reactDom from "react-dom";

import useForm from "../../services/useForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt, faImages } from "@fortawesome/free-solid-svg-icons";
import css from "./modal.module.css";

const cloud = <FontAwesomeIcon icon={faCloudUploadAlt} />;
const imgIcon = <FontAwesomeIcon icon={faImages} />;

const Modal = ({ show, setShow }) => {
  const [image, setImage] = useState("");
  const [cap, setCap] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [url, setUrl] = useState("");
  const { getProfile, addPost } = useForm();
  const imageRef = useRef();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  if (!show) {
    return null;
  }
  const getImagePreview = (event) => {
    var image = URL.createObjectURL(event.target.files[0]);
    setImage(event.target.files[0]);
    var imagediv = document.querySelector("#image");
    var newimg = document.createElement("img");
    imagediv.innerHTML = "";
    newimg.src = image;
    imagediv.appendChild(newimg);
  };

  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "kyoyu-cloudinary");
    data.append("cloud_name", "kyoyu");
    fetch("https://api.cloudinary.com/v1_1/kyoyu/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
        // console.log(data.url)
        addPost(data.url, cap);
        setShow(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        <label htmlFor="upload_file" className={css.customLabel}>
          <span> {cloud} </span> Custom Upload
        </label>
        <input
          className={css.deaultBtn}
          id="upload_file"
          type="file"
          name="post"
          onChange={getImagePreview}
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
        <button
          className={css.uploadBtn}
          onClick={() => {
            postDetails();
          }}
        >
          Upload
        </button>
        <button className={css.uploadBtn} onClick={() => setShow(false)}>
          Cancel
        </button>
      </section>
    </>,
    document.getElementById("modal")
  );
};

export default Modal;
