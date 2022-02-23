/* eslint-disable eqeqeq */
import React, { useState, useEffect, useContext } from "react";
import css from "./post.module.css";
import nodpImg from "../../images/nodp.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import FeatModal from "../Modal/FeatModal";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";
import useForm from "../../services/useForm";
import { UserContext } from "../../App";
import axios from "axios";

const likeHeart = <FontAwesomeIcon icon={faHeart} />;
const commentIcon = <FontAwesomeIcon icon={faComment} />;
const more = <FontAwesomeIcon icon={faEllipsisV} />;

const PostItem = ({ post, postid, username, caption, dp, pic, userid }) => {
  const [show, setShow] = useState(false);
  const [fshow, setFShow] = useState(false);
  const [isLiked, setIsLike] = useState(false);
  const { userposts, setUserPosts, profile } = useForm();
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const getPost = async () => {
      const userpost = await fetch("http://localhost:5000/api/posts/getposts", {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });

      const json = await userpost.json();

      const { posts } = json;
      setUserPosts(posts);
    };
    getPost();
  }, []);

  function handleModalClose() {
    setFShow(!fshow);
  }
  const likePost = (id) => {
    fetch("http://localhost:5000/api/posts/like", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ postid: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = userposts.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setUserPosts(newData);
        window.location.reload();
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unlikePost = (id) => {
    fetch("http://localhost:5000/api/posts/unlike", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ postid: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("res", result);
        const newData = userposts.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setUserPosts(newData);
        window.location.reload();
        console.log("unlike", newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Modal show={show} setShow={setShow} />
      <section className={css.post_container}>
        <div className={css.user}>
          <div className={css.profile_img}>
            {dp !== null ? (
              <img src={dp} alt="" />
            ) : (
              <img src={nodpImg} alt={username} />
            )}
          </div>
          <div className={css.username}>
            <span>{username}</span>
          </div>
        </div>
        <div className={css.post}>
          <img src={pic} alt={caption} />
          <figcaption className={css.img_caption}>
            {username} <span>{caption}</span>
          </figcaption>
          <div className={css.post_icons}>
            <div className={css.post_icon}>
              {post.likes.includes(state._id) ? (
                <button
                  type="button"
                  onClick={() => {
                    unlikePost(postid);
                  }}
                  className={css.icon}
                >
                  <i className={css.active}>{likeHeart}</i>
                  <span className={css.ispan}>{post.likes.length}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    likePost(postid);
                  }}
                  className={css.icon}
                >
                  <i>{likeHeart}</i>
                  <span className={css.ispan}>{post.likes.length}</span>
                </button>
              )}
              <button className={css.icon}>
                <Link to={`/post/${postid}`}>{commentIcon}</Link>
                <span className={css.ispan}>{post.comments.length}</span>
              </button>
            </div>
            <span className={css.icon} onClick={() => setFShow(!fshow)}>
              {more}
              <FeatModal
                id={postid}
                userid={userid}
                fshow={fshow}
                fn={handleModalClose}
                setShow={setShow}
              />
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostItem;
