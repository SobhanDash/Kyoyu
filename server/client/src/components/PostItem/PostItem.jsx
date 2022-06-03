/* eslint-disable eqeqeq */
import React, { useState } from "react";
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
import UpdateModal from "../Modal/UpdateModal";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

const likeHeart = <FontAwesomeIcon icon={faHeart} />;
const commentIcon = <FontAwesomeIcon icon={faComment} />;
const more = <FontAwesomeIcon icon={faEllipsisV} />;

const PostItem = ({ post, postid, username, caption, dp, pic, userid }) => {
  // const history = useHistory();
  const timeAgo = new TimeAgo("en-US");
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.userReducer);
  const [show, setShow] = useState(false);
  const [fshow, setFShow] = useState(false);
  const [ushow, setUShow] = useState(false);
  // const timeDif = (new Date().getTime() - post.createdAt);

  function handleModalClose() {
    setFShow(!fshow);
  }
  const likePost = () => {
    dispatch(actionCreators.likePost(postid));
  };

  const unlikePost = () => {
    dispatch(actionCreators.unlikePost(postid));
  };

  return (
    <>
      <Modal show={show} setShow={setShow} />
      <UpdateModal ushow={ushow} setUShow={setUShow} post={post} />
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
            {/* <span>{username}</span> */}
            {/* {console.log(post.user._id, "post")} */}
            {post.user._id === userid ? (
              <Link to={`/profile`}>{username}</Link>
            ) : (
              <Link to={`/userprofile/${post.user._id}`}>{username}</Link>
            )}
          </div>
        </div>
        <div className={css.post}>
          <img src={pic} alt={caption} />
          <figcaption className={css.img_caption}>
            {username} <span>{caption}</span>
          </figcaption>
          <div className={css.post_icons}>
            <div className={css.post_icon}>
              {post.likes.includes(profile._id) ? (
                <button type="button" onClick={unlikePost} className={css.icon}>
                  <i className={css.active}>{likeHeart}</i>
                  <span className={css.ispan}>{post.likes.length}</span>
                </button>
              ) : (
                <button type="button" onClick={likePost} className={css.icon}>
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
                post={post}
                id={postid}
                userid={userid}
                fshow={fshow}
                fn={handleModalClose}
                setUShow={setUShow}
              />
            </span>
          </div>
        </div>
        <p className={css.timeago}>{timeAgo.format(post.createdAt)}</p>
      </section>
    </>
  );
};

export default PostItem;
