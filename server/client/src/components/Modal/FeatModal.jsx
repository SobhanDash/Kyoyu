/* eslint-disable eqeqeq */
import React, { useContext } from "react";
import axios from "axios";
import css from "./modal.module.css";
import reactDom from "react-dom";
import { Link, useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useForm from "../../services/useForm";
import { UserContext } from "../../App";

const FeatModal = ({ id, fshow, fn, setUShow, userid }) => {
  const { userposts } = useForm();
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();

  if (!fshow) {
    return null;
  }

  const handleDeletebtn = async () => {
    try {
      const postConfig = {
        "auth-token": sessionStorage.getItem("token"),
      };
      const res = await axios.delete(`/api/posts/deletepost/${id}`, {
        headers: postConfig,
      });
      const newData = userposts.filter((item) => {
        return item._id !== res._id;
      });
      dispatch({ type: "USER", payload: newData });

      history.push("/");
      toast.success("Post Deleted", {
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
    } catch (error) {
      toast.error("Something Occured, Try Again!", {
        position: "top-right",
        autoClose: 2500,
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
      <div className={css.fbackdrop}></div>
      <div className={css.featcont}>
        {userid == state._id && (
          <button
            className={`${css.fbutton} ${css.delete}`}
            onClick={handleDeletebtn}
          >
            Delete
          </button>
        )}
        <button className={`${css.fbutton} ${css.share}`}>Share</button>
        {userid == state._id && (
          <Link
            to={location.pathname}
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
