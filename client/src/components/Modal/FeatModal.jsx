import React, { useState } from "react";
import axios from "axios";
import css from "./modal.module.css";
import reactDom from "react-dom";
import { Link, useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "./Modal";

const FeatModal = ({ postid, fshow, fn }) => {
  const [show, setShow] = useState(false);
  const history = useHistory();
  const location = useLocation();
  if (!fshow) {
    return null;
  }

  const updatePost = async (cap = "") => {
    const postConfig = {
      "auth-token": localStorage.getItem("token"),
    };
    const postBody = {
      caption: cap,
    };
    const res = await axios.put(
      `http://localhost:5000/api/posts/updatepost/${postid}`,
      postBody,
      { headers: postConfig }
    );
    console.log(res);
  };

  const handleDeletebtn = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/posts/deletepost/${postid}`
      );
      history.push("/");
      toast.success("Post Deleted", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setShow(false);
    } catch (error) {
      toast.error(`${error.response.data.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return reactDom.createPortal(
    <>
      <Modal show={show} setShow={setShow} />
      <div className={css.fbackdrop}></div>
      <div className={css.featcont}>
        <button
          className={`${css.fbutton} ${css.delete}`}
          onClick={handleDeletebtn}
        >
          Delete
        </button>

        <button className={`${css.fbutton} ${css.share}`}>Share</button>
        <Link
          to={location.pathname}
          className={`${css.fbutton}`}
          onClick={() => setShow(true)}
        >
          <button className={`${css.update}`}>Update</button>
        </Link>

        <button className={`${css.fbutton} ${css.cancel}`} onClick={fn}>
          Cancel
        </button>
      </div>
    </>,
    document.getElementById("featModal")
  );
};

export default FeatModal;
