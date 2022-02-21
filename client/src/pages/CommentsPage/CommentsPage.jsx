import React, { useEffect, useState } from "react";
import css from "./commentsPage.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Modal from "../../components/Modal/Modal";
import { useParams } from "react-router-dom";

import PostItem from "../../components/PostItem/PostItem";
import Comments from "../../components/Comments/Comments";
import useForm from "../../services/useForm";

//
import { userpostsApi } from "../../components/Comments/api";
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
  const { profile, setUserPosts } = useForm();
  const { postid } = useParams();
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    userpostsApi().then((d) => {
      setUserPosts(d);
      const filterDataItem = d.filter(
        (filterdata) => filterdata.id === postid
      );
      setFilterData(filterDataItem);
    });
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //
  // const [isLiked, setIsLike] = useState(false);
  // const [fshow, setFShow] = useState(false);
  // function handleModalClose() {
  //   setFShow(!fshow);
  // }
  //

  // console.log(filterDataItem);
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
          {filterData &&
            filterData.map((post) => {
              return (
                <>
                  <PostItem
                    postid={post.id}
                    username={profile.username}
                    caption={post.caption}
                    dp={profile.profilePic}
                    pic={post.image}
                  />
                  <Comments commentsUrl="/post" currentUserId={post.id} />
                </>
              );
            })}
        </div>
      </section>
    </>
  );
};

export default CommentsPage;
