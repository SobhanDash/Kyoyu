import React, { useEffect, useRef, useState } from "react";
import reactDom from "react-dom";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import useForm from "../../services/useForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt, faImages } from "@fortawesome/free-solid-svg-icons";
import css from "./modal.module.css";

toast.configure();
const cloud = <FontAwesomeIcon icon={faCloudUploadAlt} />;
const imgIcon = <FontAwesomeIcon icon={faImages} />;

const Modal = ({ show, setShow }) => {
  const [image, setImage] = useState("");
  const [cap, setCap] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [url, setUrl] = useState("");
  const { getProfile } = useForm();
  const imageRef = useRef();
  const history = useHistory();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  // --------------ADD POST--------
  useEffect(() => {
    if (url) {
      fetch("http://localhost:5000/api/posts/addpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          image: url,
          caption: cap,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            toast.error(data.error, {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.success("Created post Successfully", {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]);

  if (!show) {
    return null;
  }

  // const addPost = async (url, cap = "") => {
  //   // eslint-disable-next-line no-unused-vars
  //   const token = window.localStorage.getItem("token");
  //   const postConfig = {
  //     "auth-token": token,
  //   };
  //   const postBody = {
  //     image: url,
  //     caption: cap,
  //   };
  //   const res = await axios.post(
  //     "http://localhost:5000/api/posts/addpost",
  //     postBody,
  //     {
  //       headers: postConfig,
  //     }
  //   );
  // };
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
        console.log(data);
        setUrl(data.url);
        // setCap(data.caption)
        // addPost(data.url, cap);
        setShow(false);
      })
      .catch((err) => {
        console.log(err);
      });
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
// const mapStateToProps = (state) => {
//   return {
//     userposts: state.UserReducer,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     FetchPost: () => dispatch(FetchPost()),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Modal);
