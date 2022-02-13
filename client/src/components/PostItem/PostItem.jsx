import React, { useState } from "react";
import css from "./post.module.css";
import useForm from "../../services/useForm";
import nodpImg from "../../images/nodp.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import FeatModal from "../Modal/FeatModal";
import { Link } from "react-router-dom";

const likeHeart = <FontAwesomeIcon icon={faHeart} />;
const commentIcon = <FontAwesomeIcon icon={faComment} />;
const more = <FontAwesomeIcon icon={faEllipsisV} />;

const PostItem = ({ postid, username, caption, dp, pic }) => {
  const [fshow, setFShow] = useState(false);
  const [isLiked, setIsLike] = useState(false);
  function handleModalClose() {
    setFShow(!fshow);
  }
  return (
    <>
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
              <button
                type="button"
                onClick={() => {
                  setIsLike(!isLiked);
                }}
                className={css.icon}
              >
                <i className={isLiked ? css.active : " "}>{likeHeart}</i>
                {/* <span className={css.ispan}>{likes.length}</span> */}
              </button>
              <button className={css.icon}>
                <Link to="/post">{commentIcon}</Link>
                {/* <span className={css.ispan}>{comments.length}</span> */}
              </button>
            </div>
            <span className={css.icon} onClick={() => setFShow(!fshow)}>
              {more}
              <FeatModal fshow={fshow} fn={handleModalClose} />
            </span>
          </div>
        </div>
        
      </section>
    </>
  );
};

export default PostItem;
