import React, { useEffect, useRef, useState } from "react";
import reactDom from "react-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt, faImages } from "@fortawesome/free-solid-svg-icons";
import css from "./modal.module.css";

toast.configure();
const cloud = <FontAwesomeIcon icon={faCloudUploadAlt} />;
const imgIcon = <FontAwesomeIcon icon={faImages} />;

const UpdateModal = ({ ushow, setUShow, post }) => {
  const [image, setImage] = useState("");
  const [cap, setCap] = useState("");
  const imageRef = useRef();
  // -----------------UPDATE POST--------------//
  useEffect(() => {
    if (cap) {
      // console.log(cap);
      fetch(`http://localhost:5000/api/posts/updatepost/${post._id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          caption: cap,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            toast.error(data.error, {
              position: "top-right",
              autoClose: 2500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.success("Post Updated", {
              position: "top-right",
              autoClose: 2500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [ushow]);

  if (!ushow) {
    return null;
  }
  // ----------

  // --------CLOUDINARY UPLOAD----------
  const getImagePreview = (event) => {
    var image = post.image;
    setImage(post.image);
    var imagediv = document.querySelector("#image");
    var newimg = document.createElement("img");
    newimg.src = image;
    imagediv.appendChild(newimg);
  };

  const updateDetails = (e) => {
    try {
      setCap(cap)
      setUShow(false);
    } catch (err) {
      console.log(err);
    }
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
        <label htmlFor="update_file" className={css.customLabel}>
          <span> {cloud} </span> Get Image
        </label>
        <input
          className={css.getImgBtn}
          id="update_file"
          type="button"
          name="post"
          onClick={getImagePreview}
          ref={imageRef}
        />
        <input
          className={css.caption}
          value={cap}
          type="text"
          name="caption"
          placeholder={post.caption}
          onChange={(e) => setCap(e.target.value)}
        />
        <button
          className={css.uploadBtn}
          onClick={() => {
            updateDetails();
          }}
        >
          Update
        </button>
        <button className={css.uploadBtn} onClick={() => setUShow(false)}>
          Cancel
        </button>
      </section>
    </>,
    document.getElementById("updatemodal")
  );
};

export default UpdateModal;
