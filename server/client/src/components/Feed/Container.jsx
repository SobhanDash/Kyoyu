import React, { useEffect } from "react";
import PostItem from "../PostItem/PostItem";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux";

import css from "./container.module.css";
// import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import SearchBar from "../SearchBar/SearchBar";

const Container = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.userReducer, shallowEqual);
  const { posts } = useSelector((state) => state.postReducer, shallowEqual);

  useEffect(() => {
    dispatch(actionCreators.getPosts());
  }, [dispatch]);

  // if (isLoading) {
  //   return <LoadingSpinner />;
  // }
  return (
    <>
      <SearchBar />
      <section className={css.feed}>
        {posts.length > 0 &&
          posts.map((post) => {
            return (
              <PostItem
                key={post._id}
                post={post}
                postid={post._id}
                userid={profile._id}
                username={post.user.username}
                caption={post.caption}
                dp={post.user.about.profilepic}
                pic={post.image}
              />
            );
          })}
      </section>
    </>
  );
};

export default Container;
