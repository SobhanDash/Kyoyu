import React, { useEffect, useState } from "react";
import css from "./commentsPage.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Modal from "../../components/Modal/Modal";
import { useParams } from "react-router-dom";
import axios from "axios";
import PostItem from "../../components/PostItem/PostItem";
import Comments from "../../components/Comments/Comments";
import useForm from "../../services/useForm";

const CommentsPage = () => {
  const [show, setShow] = useState(false);
  const { setProfile, getProfile, profile, setUserPosts, userposts } =
    useForm();
  const { postid } = useParams();

  // useEffect(() => {
  //   const getPost = async () => {
  //     const userpost = await fetch("/api/posts/getposts", {
  //       method: "GET",
  //       headers: {
  //         "auth-token": sessionStorage.getItem("token"),
  //       },
  //     });

  //     const json = await userpost.json();

  //     const { posts } = json;
  //     setUserPosts(posts);
  //   };
  //   getProfile();
  //   getPost();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  const filterData = userposts.filter((item) => {
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
                <>
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
                  <Comments
                    post={post}
                    profile={profile}
                    userposts={userposts}
                    setUserPosts={setUserPosts}
                  />
                </>
              );
            })}
        </div>
      </section>
    </>
  );
};

export default CommentsPage;
