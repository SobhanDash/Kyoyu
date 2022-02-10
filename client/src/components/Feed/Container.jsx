import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import css from "./container.module.css";
import useForm from "../../services/useForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import nodpImg from "../../images/nodp.jpg";
import PostItem from "../PostItem/PostItem";
import FeatModal from "../Modal/FeatModal";

const likeHeart = <FontAwesomeIcon icon={faHeart} />;
const commentIcon = <FontAwesomeIcon icon={faComment} />;
const more = <FontAwesomeIcon icon={faEllipsisV} />;

const Container = () => {
  const { getProfile, profile, getPost, userposts } = useForm();
  const [fshow, setFShow] = useState(false);
  function handleModalClose() {
    setFShow(!fshow);
  }
  const [isLiked, setIsLike] = useState(false);

  // useEffect(() => {
  //   getProfile();
  //   getPost();
  // }, [getProfile, getPost]);

  return (
    <>
      <section className={css.feed}>
        {profile.posts.length !== 0 &&
          userposts.map((post) => {
            return (
              <PostItem
                key={post.id}
                username={profile.username}
                caption={post.caption}
                dp={profile.profilePic}
                pic={post.image}
              />
            );
          })}

        <section className={css.post_container}>
          <div className={css.user}>
            <div className={css.profile_img}>
              <img src={nodpImg} alt="username" />
            </div>
            <div className={css.username}>
              <span>anderson_009</span>
            </div>
          </div>
          <div className={css.post}>
            <img src="https://picsum.photos/200/300" alt="temp" />
            <figcaption className={css.img_caption}>
              anderson_009 <span> Lorem ipsum dolor sit amet.</span>
            </figcaption>
            <div className={css.post_icons}>
              <div className={css.post_icon}>
                <button
                  type="button"
                  onClick={() => {
                    console.log("click1");
                    setIsLike(!isLiked);
                  }}
                  className={css.icon}
                >
                  <i className={isLiked ? css.active : " "}>{likeHeart}</i>

                  {/* <span className={css.icon}>{likes.length}</span> */}
                  <span className={css.ispan}>102</span>
                </button>
                <button className={css.icon}>
                  <Link to="/post">{commentIcon}</Link>
                  <span className={css.ispan}>12</span>
                  {/* <span className={css.icon}>{comments.length}</span> */}
                </button>
              </div>
              <span className={css.icon} onClick={() => setFShow(!fshow)}>
                {more}
                <FeatModal fshow={fshow} fn={handleModalClose} />
              </span>
            </div>
          </div>
        </section>

        <section className={css.post_container}>
          <div className={css.user}>
            <div className={css.profile_img}>
              <img src={nodpImg} alt="username" />
            </div>
            <div className={css.username}>
              <span>anderson_009</span>
            </div>
          </div>
          <div className={css.post}>
            <img src="https://picsum.photos/200/300" alt="temp" />
            <figcaption className={css.img_caption}>
              anderson_009 <span> Lorem ipsum dolor sit amet.</span>
            </figcaption>
            <div className={css.post_icons}>
              <div className={css.post_icon}>
                <button
                  type="button"
                  onClick={() => {
                    console.log("click2");
                    setIsLike(!isLiked);
                  }}
                  className={css.icon}
                >
                  <i className={isLiked ? css.active : " "}>{likeHeart}</i>

                  {/* <span className={css.icon}>{likes.length}</span> */}
                  <span className={css.ispan}>102</span>
                </button>
                <button className={css.icon}>
                  <Link to="/post">{commentIcon}</Link>
                  <span className={css.ispan}>12</span>
                  {/* <span className={css.icon}>{comments.length}</span> */}
                </button>
              </div>
              <span className={css.icon} onClick={() => setFShow(!fshow)}>
                {more}
                <FeatModal fshow={fshow} fn={handleModalClose} />
              </span>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default Container;
