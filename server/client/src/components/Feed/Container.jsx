import React, { useEffect } from "react";
import css from "./container.module.css";
import useForm from "../../services/useForm";
import PostItem from "../PostItem/PostItem";

const Container = () => {
  const { getProfile, profile, getPost, userposts } = useForm();

  useEffect(() => {
    getProfile();
    getPost();
  }, []);
  return (
    <>
      <section className={css.feed}>
        {profile &&
          userposts.map((post) => {
            return (
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
            );
          })}
      </section>
    </>
  );
};

export default Container;
