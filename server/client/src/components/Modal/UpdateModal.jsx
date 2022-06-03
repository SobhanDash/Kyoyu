import React, { useRef, useState } from "react";
import reactDom from "react-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import css from "./modal.module.css";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../redux";

toast.configure();

const UpdateModal = ({ ushow, setUShow, post }) => {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [image, setImage] = useState(post.image ? post.image : "");
  const [cap, setCap] = useState(post.caption ? post.caption : "");
  const imageRef = useRef();

  const updateDetails = (e) => {
    dispatch(
      actionCreators.updatePost({ id: post._id, image: image, caption: cap })
    );
    setUShow(false);
  };

  if (!ushow) {
    return null;
  }

  return reactDom.createPortal(
    <>
      <div className={css.backdrop}></div>
      <section className={css.modal}>
        <div className={css.wrapper}>
          <div className={css.image} id="image">
            <img src={post.image} alt={post._id} />
          </div>
        </div>
        {imageRef.current !== undefined && (
          <div className={css.picDisplay}></div>
        )}
        <input
          className={css.caption}
          value={cap}
          type="text"
          name="caption"
          placeholder="Enter caption"
          onChange={(e) => setCap(e.target.value)}
        />
        <button
          className={css.uploadBtn}
          onClick={(e) => {
            updateDetails(e);
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
