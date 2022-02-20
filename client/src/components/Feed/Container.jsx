import React, { useEffect } from "react";
import css from "./container.module.css";
import useForm from "../../services/useForm";
import PostItem from "../PostItem/PostItem";

const Container = () => {
  const { getProfile, profile, getPost, userposts } = useForm();

  useEffect(() => {
    getProfile();
    getPost();
  }, [getProfile, getPost]);

  return (
    <>
      <section className={css.feed}>
        {/* {console.log(userposts)} */}
        {profile.posts.length !== 0 &&
          userposts.map((post) => {
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
      </section>
    </>
  );
};

export default Container;
