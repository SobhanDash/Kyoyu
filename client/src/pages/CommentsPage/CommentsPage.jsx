import React, { useState } from "react";
import css from "./commentsPage.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Modal from "../../components/Modal/Modal";
import { Link, useParams } from "react-router-dom";

import PostItem from "../../components/PostItem/PostItem";
import Comments from "../../components/Comments/Comments";
import useForm from "../../services/useForm";

//
// import FeatModal from "../../components/Modal/FeatModal";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
  //   faHeart,
  //   faComment,
  //   faEllipsisV,
  // } from "@fortawesome/free-solid-svg-icons";
  // import nodpImg from "../../images/nodp.jpg";
  
// const likeHeart = <FontAwesomeIcon icon={faHeart} />;
// const commentIcon = <FontAwesomeIcon icon={faComment} />;
// const more = <FontAwesomeIcon icon={faEllipsisV} />;

//

const CommentsPage = () => {
  const [show, setShow] = useState(false);
  const { profile, userposts } = useForm();
  const { id } = useParams();

  //
  // const [isLiked, setIsLike] = useState(false);
  // const [fshow, setFShow] = useState(false);
  // function handleModalClose() {
  //   setFShow(!fshow);
  // }
  //
  const filterDataItem = userposts.filter((filterdata) => {
    return filterdata._id === id;
  });

  return (
    <>
      <Modal show={show} setShow={setShow} />

      <section className={css.pcontainer}>
        <div>
          <Sidebar setShow={setShow} />
        </div>
        {/* temp below */}
        <div className={css.feed}>
          {/* Post Item */}
          {filterDataItem &&
            filterDataItem.map((post) => {
              return (
                <PostItem
                  postid={post.id}
                  username={profile.username}
                  caption={post.caption}
                  dp={profile.profilePic}
                  pic={post.image}
                />
              );
            })}

          {/* Comment Section */}
          <Comments commentsUrl="/post" currentUserId="2" />
        </div>
      </section>
    </>
  );
};

export default CommentsPage;
