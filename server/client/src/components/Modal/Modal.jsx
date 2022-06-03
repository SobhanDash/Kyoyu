import React, { useEffect, useRef, useState } from "react";
import reactDom from "react-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt, faImages } from "@fortawesome/free-solid-svg-icons";
import css from "./modal.module.css";
import axios from "axios";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux";

toast.configure();
const cloud = <FontAwesomeIcon icon={faCloudUploadAlt} />;
const imgIcon = <FontAwesomeIcon icon={faImages} />;

const Modal = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const { error, isLoading } = useSelector(
    (state) => state.postReducer,
    shallowEqual
  );
  const [image, setImage] = useState("");
  const [cap, setCap] = useState("");
  const [url, setUrl] = useState("");
  const imageRef = useRef();

  // --------------ADD POST--------
  useEffect(() => {
    if (url !== "") {
      dispatch(actionCreators.addPost(url, cap));
      setUrl("");
    }

    if (error && !isLoading) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [url, cap, dispatch, error, image, isLoading]);

  if (!show) {
    return null;
  }
  // ----------

  // --------CLOUDINARY UPLOAD----------
  const getImagePreview = (event) => {
    var image = URL.createObjectURL(event.target.files[0]);
    setImage(event.target.files[0]);
    var imagediv = document.querySelector("#image");
    var newimg = document.createElement("img");
    imagediv.innerHTML = "";
    newimg.src = image;
    imagediv.appendChild(newimg);
  };

  const postDetails = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "kyoyu-cloudinary");
    data.append("cloud_name", "kyoyu");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/kyoyu/image/upload",
      data
    );
    setUrl(res.data.secure_url);
    setShow(false);
  };
  // --------------

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
