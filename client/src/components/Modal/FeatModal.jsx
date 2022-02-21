/* eslint-disable eqeqeq */
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import css from "./modal.module.css";
import reactDom from "react-dom";
import { Link, useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useForm from "../../services/useForm";
import { UserContext } from "../../App";

const FeatModal = ({ id, fshow, fn, setShow, userid }) => {
  const { setUserPosts, userposts } = useForm();
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    fetch("http://localhost:5000/api/posts/getposts", {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setUserPosts(result.posts);
      });
  }, [setUserPosts]);

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
      `http://localhost:5000/api/posts/updatepost/${id}`,
      postBody,
      { headers: postConfig }
    );
    // console.log(res);
  };

  const handleDeletebtn = async () => {
    try {
      const postConfig = {
        "auth-token": localStorage.getItem("token"),
      };
      const res = await axios.delete(
        `http://localhost:5000/api/posts/deletepost/${id}`,
        { headers: postConfig }
      );
      const newData = userposts.filter((item) => {
        console.log(item._id, res);
        return item._id !== res._id;
      });
      console.log(newData);
      setUserPosts(newData);
      // console.log(res);
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
  // const deletePost = (postid) => {
  //   fetch(`http://localhost:5000/api/posts/deletepost/${id}`, {
  //     method: "delete",
  //     headers: {
  //       "auth-token": localStorage.getItem("token"),
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       const newData = userposts.filter((item) => {
  //         return item._id !== result._id;
  //       });
  //       setUserPosts(newData);
  //     });
  // };

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
            onClick={() => setShow(true)}
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
