import React, { useState } from "react";
import css from "./commentsPage.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Modal from "../../components/Modal/Modal";
import { Link } from "react-router-dom";

//
import FeatModal from "../../components/Modal/FeatModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import nodpImg from "../../images/nodp.jpg";
import useForm from "../../services/useForm";

const likeHeart = <FontAwesomeIcon icon={faHeart} />;
const commentIcon = <FontAwesomeIcon icon={faComment} />;
const more = <FontAwesomeIcon icon={faEllipsisV} />;

//

const CommentsPage = () => {
  const [show, setShow] = useState(false);
  const { handleComment } = useForm();

  //
  const [isLiked, setIsLike] = useState(false);
  const [fshow, setFShow] = useState(false);
  function handleModalClose() {
    setFShow(!fshow);
  }
  //

  return (
    <>
      <Modal show={show} setShow={setShow} />

      <section className={css.pcontainer}>
        <div>
          <Sidebar setShow={setShow} />
        </div>
        {/* temp below */}
        <div className={css.feed}>
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
          <div className={css.commentSection}>
            <header className={css.cname}>Comments</header>
            <div className={css.cinputdiv}>
              <input
                type="text"
                placeholder="Write Your comment Here"
                className={css.cip}
                name="comment"
                id="comment"
                onChange={handleComment}
              />
              <button className={css.cpost}>Post</button>
            </div>
          </div>
          <div className={css.clist}></div>
        </div>
      </section>
    </>
  );
};

export default CommentsPage;
