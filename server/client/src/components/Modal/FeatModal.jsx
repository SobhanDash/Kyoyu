/* eslint-disable eqeqeq */
import React from "react";
import css from "./modal.module.css";
import reactDom from "react-dom";
import { Link, useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../redux";

const FeatModal = ({ post, fshow, fn, setUShow, userid }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  if (!fshow) {
    return null;
  }

  const handleDeletebtn = async () => {
    dispatch(actionCreators.deletePost(post._id));
    history.push("/");
  };

  return reactDom.createPortal(
    <>
      <div className={css.fbackdrop}></div>
      <div className={css.featcont}>
        {post.user._id == userid && (
          <button
            className={`${css.fbutton} ${css.delete}`}
            onClick={handleDeletebtn}
          >
            Delete
          </button>
        )}
        <button className={`${css.fbutton} ${css.share}`}>Share</button>
        {post.user._id == userid && (
          <Link
            to=""
            className={`${css.fbutton}`}
            onClick={() => setUShow(true)}
          >
            <button className={`${css.update}`}>Update</button>
          </Link>
        )}
        <button className={`${css.fbutton} ${css.cancel}`} onClick={fn}>
          Cancel
        </button>
      </div>
    </>,
    document.getElementById("featModal")
  );
};

export default FeatModal;
