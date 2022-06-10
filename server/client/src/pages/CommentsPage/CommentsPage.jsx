import React, { Fragment, useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Modal from "../../components/Modal/Modal";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PostItem from "../../components/PostItem/PostItem";
import Comments from "../../components/Comments/Comments";

import css from "./commentsPage.module.css";
import { actionCreators } from "../../redux";

const CommentsPage = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.userReducer, shallowEqual);
  const { posts } = useSelector((state) => state.postReducer, shallowEqual);
  const [show, setShow] = useState(false);
  const { postid } = useParams();

  useEffect(() => {
    dispatch(actionCreators.fetchPost(postid));
    dispatch(actionCreators.getProfile());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const filterData = posts.filter((item) => {
    return item._id === postid;
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
          {profile &&
            filterData.map((post) => {
              return (
                <Fragment key={post._id}>
                  <PostItem
                    key={post._id}
                    post={post}
                    postid={post._id}
                    userid={post.user._id}
                    username={post.user.username}
                    caption={post.caption}
                    dp={post.user.about.profilepic}
                    pic={post.image}
                  />
                  <Comments post={post} profile={profile} />
                </Fragment>
              );
            })}
        </div>
      </section>
    </>
  );
};

export default CommentsPage;
